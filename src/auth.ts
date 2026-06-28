import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma/client";

type AppRole = "owner" | "staff";

type AppUser = {
  id: string;
  storeId: string;
  name: string;
  email: string;
  role: AppRole;
};

type AppToken = {
  id?: string;
  storeId?: string;
  role?: AppRole;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "メールアドレス",
          type: "email",
        },
        password: {
          label: "パスワード",
          type: "password",
        },
      },
      async authorize(credentials): Promise<AppUser | null> {
        const email = String(credentials?.email ?? "");
        const password = String(credentials?.password ?? "");

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email,
            isActive: true,
            deletedAt: null,
          },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await compare(password, user.passwordHash);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          storeId: user.storeId,
          name: user.name,
          email: user.email,
          role: user.role as AppRole,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const appToken = token as typeof token & AppToken;

      if (user) {
        const appUser = user as AppUser;

        appToken.id = appUser.id;
        appToken.storeId = appUser.storeId;
        appToken.role = appUser.role;
      }

      return appToken;
    },
    async session({ session, token }) {
      const appToken = token as AppToken;

      if (session.user) {
        session.user.id = String(appToken.id);
        session.user.storeId = String(appToken.storeId);
        session.user.role = appToken.role ?? "staff";
      }

      return session;
    },
  },
});
