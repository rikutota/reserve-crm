import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      storeId: string;
      role: "owner" | "staff";
    } & DefaultSession["user"];
  }

  interface User {
    storeId: string;
    role: "owner" | "staff";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    storeId: string;
    role: "owner" | "staff";
  }
}
