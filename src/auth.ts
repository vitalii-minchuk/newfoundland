import NextAuth from "next-auth"
import {PrismaAdapter} from '@auth/prisma-adapter'
import { prismaDB } from "@/lib/db"
import authConfig from '@/auth.config'

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
    adapter: PrismaAdapter(prismaDB),
    session: {strategy: 'jwt'},
    ...authConfig,
})