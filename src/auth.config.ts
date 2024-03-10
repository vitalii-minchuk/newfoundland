import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "@/helpers/user"

export default {
  providers: [
    Credentials({
        async authorize(credentials) {
            const validatedData = LoginSchema.safeParse(credentials)

            if (!validatedData.success) return null

            const {email, password} = validatedData.data
            const user = await getUserByEmail(email)

            if (!user || !user.password) return null

            const passwordsMatch = await bcrypt.compare(password, user.password)

            if (passwordsMatch) return user

            return null
        }
    })
],
} satisfies NextAuthConfig