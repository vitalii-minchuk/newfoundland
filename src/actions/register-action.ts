"use server"

import bcrypt from 'bcryptjs'

import { RegisterSchema, TRegisterInput } from "@/schemas"
import { prismaDB } from '@/lib/db'
import { getUserByEmail } from '@/helpers/user'
import { generateVerificationToken } from '@/helpers/verification-token'
import { sendEmail } from '@/lib/mail'
import { verificationLinkEmailHtml } from '@/components/emails/verification-link-email'

export const register = async (input: TRegisterInput) => {
    const validatedData = RegisterSchema.safeParse(input)

    if (!validatedData.success) {
        return {error: true, message: 'Invalid fields'}
    }

    const {email, name, password} = validatedData.data

    const user = await getUserByEmail(email)

    if (user) {
        return {error: true, message: 'Email already in use'}
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prismaDB.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            }
        })

    const verificationToken = await generateVerificationToken(email)
    const link = `http://localhost:3000/auth/new-verification?token=${verificationToken.token}`
   
    await sendEmail({
        to: process.env.TEST_EMAIL_ADDRESS!,
        subject: 'verify your email',
        body: verificationLinkEmailHtml(link)
    })

    return {success: true, message: 'Confirmation email sent'}
}