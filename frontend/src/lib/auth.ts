import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
          })
          if (!res.ok) return null
          const data = await res.json()
          return { id: data.user.id, name: data.user.name, email: data.user.email, role: data.user.role, access_token: data.access_token }
        } catch {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role as string
        token.access_token = (user as any).access_token as string
      }
      return token
    },
    async session({ session, token }) {
      (session.user as any).role = token.role as string
      (session.user as any).access_token = token.access_token as string
      return session
    },
  },
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
})
