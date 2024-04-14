"use server"

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

import { ResetSchema, TResetInput } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { getUserByEmail } from '@/helpers/user'
import { generateVerificationToken } from '@/helpers/verification-token'
import { verificationLinkEmailHtml } from '@/components/emails/verification-link-email'
import { sendEmail } from '@/lib/mail'

export const reset = async (input: TResetInput) => {
    const validatedData = ResetSchema.safeParse(input)

    if (!validatedData.success) {
        return {error: true, message: 'Invalid fields'}
    }

    const {email} = validatedData.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser?.email || !existingUser.password) {
        return {error: true, message: 'Email does not exist!'}
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)
        const link = `http://localhost:3000/auth/new-verification?token=${verificationToken.token}`
       
        await sendEmail({
            to: process.env.TEST_EMAIL_ADDRESS!,
            subject: 'verify your email',
            body: verificationLinkEmailHtml(link)
        })

        return {success: true, message: 'Confirmation email sent'}
    }

    return {success: true, message: 'Logged in'}
}