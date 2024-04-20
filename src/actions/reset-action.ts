"use server"

import { ResetSchema, TResetInput } from "@/schemas"
import { getUserByEmail } from '@/helpers/user'
import { sendEmail } from '@/lib/mail'
import { generatePasswordResetToken } from "@/helpers/password-reset-token"
import { resetPasswordLinkEmailHtml } from "@/components/emails/reset-link-email"

export const reset = async (input: TResetInput) => {
    const validatedData = ResetSchema.safeParse(input)

    if (!validatedData.success) {
        return {error: true, message: 'Invalid fields'}
    }

    const {email} = validatedData.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return {error: true, message: 'Email does not exist!'}
    }

        const passwordResetToken = await generatePasswordResetToken(email)
        const link = `http://localhost:3000/auth/new-password?token=${passwordResetToken.token}`
       
        await sendEmail({
            to: process.env.TEST_EMAIL_ADDRESS!,
            subject: 'verify your email',
            body: resetPasswordLinkEmailHtml(link)
        })

    return {success: true, message: 'Reset email sent'}
}