import { loginUser } from "@/utils/api";
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test" },
        password: { label: "Password", type: "password", placeholder: "password" }
      },
      async authorize(credentials, req) {
        
        const res = await loginUser({
          email: String(credentials?.email),
          password: String(credentials?.password)
        })
        
        const user = res.data

        if (user) {
          return user
        } else {
          return null
        }
      }

    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login"
  }
}