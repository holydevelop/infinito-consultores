import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string | null;
      // Otras propiedades personalizadas si las tienes
    } & DefaultSession["user"];
  }
}
