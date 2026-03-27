import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin-login",
  },
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize(rawCredentials) {
        const expectedUsername = process.env.ADMIN_USERNAME;
        const expectedPassword = process.env.ADMIN_PASSWORD;

        if (!expectedUsername || !expectedPassword) {
          return null;
        }

        const username = String(rawCredentials?.username ?? "").trim();
        const password = String(rawCredentials?.password ?? "");
        if (!username || !password) return null;

        if (username !== expectedUsername || password !== expectedPassword) {
          return null;
        }

        return {
          id: "admin",
          name: "Administrator",
          role: "admin",
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "admin";
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = (token.role as string | undefined) ?? "admin";
      return session;
    },
  },
});
