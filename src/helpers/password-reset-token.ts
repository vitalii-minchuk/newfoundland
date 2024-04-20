import { prismaDB } from "@/lib/db"
import {v4 as uuid4 } from 'uuid'

export const getPasswordResetTokenByEmail = async (email?: string) => {
    if (!email) return null

    try {
        const passwordResetToken = await prismaDB.passwordResetToken.findFirst({
            where: { email }
        })

        return passwordResetToken
    } catch {
        return null
    }
}

export const getPasswordResetTokenByToken = async (token?: string) => {
    if (!token) return null

    try {
        const passwordResetToken = await prismaDB.passwordResetToken.findUnique({
            where: { token }
        })

        return passwordResetToken
    } catch {
        return null
    }
}

export const generatePasswordResetToken = async (email: string) => {
    const token = uuid4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getPasswordResetTokenByEmail(email)

    if (existingToken) {
        await prismaDB.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const passwordResetToken = await prismaDB.passwordResetToken.create({
        data: {
            token,
            email,
            expires
        }
    })

    return passwordResetToken
}