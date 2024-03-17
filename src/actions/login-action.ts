"use server"

import * as zod from 'zod'

import { LoginSchema, TLoginInput } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/helpers/user'
import { generateVerificationToken } from '@/helpers/verification-token'

export const login = async (input: TLoginInput) => {
    const validatedData = LoginSchema.safeParse(input)

    if (!validatedData.success) {
        return {error: true, message: 'Invalid fields'}
    }

    const {email, password} = validatedData.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser?.email || !existingUser.password) {
        return {error: true, message: 'Email does not exist!'}
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)

        return {success: true, message: 'Confirmation email sent'}
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
          })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {error: true, message: 'Invalid credentials'}
                default:
                    return {error: true, message: 'Something went wrong'}
            }
        }

        throw error
    }

    return {success: true, message: 'Logged in'}
}