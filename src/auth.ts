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
  callbacks: {
    // async signIn({user}) {
    //   if (!user?.id) return false

    //   const existingUser = await getUserById(user.id)

    //   if (!existingUser || !existingUser.emailVerified) return false

    //   return true
    // },
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