import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const passwordHash = await hash("password", 10);

  const store = await prisma.store.upsert({
    where: {
      id: "00000000-0000-4000-8000-000000000001",
    },
    update: {
      name: "Reserve CRM Demo Salon",
      timezone: "Asia/Tokyo",
    },
    create: {
      id: "00000000-0000-4000-8000-000000000001",
      name: "Reserve CRM Demo Salon",
      timezone: "Asia/Tokyo",
    },
  });

  const owner = await prisma.user.upsert({
    where: {
      storeId_email: {
        storeId: store.id,
        email: "owner@example.com",
      },
    },
    update: {
      name: "オーナー",
      passwordHash,
      role: UserRole.owner,
      isActive: true,
      deletedAt: null,
    },
    create: {
      storeId: store.id,
      name: "オーナー",
      email: "owner@example.com",
      passwordHash,
      role: UserRole.owner,
      isActive: true,
    },
  });

  console.log("Seed completed");
  console.log({
    store: {
      id: store.id,
      name: store.name,
    },
    owner: {
      id: owner.id,
      email: owner.email,
      name: owner.name,
      role: owner.role,
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
