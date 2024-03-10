import NextAuth from "next-auth"
import {PrismaAdapter} from '@auth/prisma-adapter'
import { prismaDB } from "@/lib/db"
import authConfig from '@/auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({session, token}) {
      if (token?.sub && session?.user?.id) {
        session.user.id = token.sub
      }
      
      return session
    },
    async jwt({token}) {
      return token
    },
  },
    adapter: PrismaAdapter(prismaDB),
    session: {strategy: 'jwt'},
    ...authConfig,
})