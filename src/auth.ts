import NextAuth, { DefaultSession } from "next-auth"
import {PrismaAdapter} from '@auth/prisma-adapter'

import { UserRole } from "@prisma/client"
import { prismaDB } from "@/lib/db"
import authConfig from '@/auth.config'
import { getUserById } from "@/helpers/user"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({user}) {
      await prismaDB.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date()
        }
      })
    },
  },
  callbacks: {
    async signIn({user, account}) {
      if (account?.provider !== 'credentials') return true
      
      if (!user?.id) return false

      const existingUser = await getUserById(user.id)

      if (!existingUser?.emailVerified) return false

      return true
    },
    async session({session, token}) {
      if (token?.sub && session?.user) {
        session.user.id = token.sub
      }

      if (token?.role && session?.user) {
        session.user.role = token.role as UserRole
      }

      return session
    },
    async jwt({token}) {
      if (!token.sub) return token

      const user = await getUserById(token.sub)

      if (!user) return token

      token.role = user.role

      return token
    },
  },
    adapter: PrismaAdapter(prismaDB),
    session: {strategy: 'jwt'},
    ...authConfig,
})