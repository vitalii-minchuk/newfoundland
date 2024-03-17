import { prismaDB } from "@/lib/db"
import {v4 as uuid4 } from 'uuid'

export const getVerificationTokenByEmail = async (email?: string) => {
    if (!email) return null

    try {
        const verificationToken = await prismaDB.verificationToken.findFirst({
            where: { email }
        })

        return verificationToken
    } catch {
        return null
    }
}

export const getVerificationTokenByToken = async (token?: string) => {
    if (!token) return null

    try {
        const verificationToken = await prismaDB.verificationToken.findUnique({
            where: { token }
        })

        return verificationToken
    } catch {
        return null
    }
}

export const generateVerificationToken = async (email: string) => {
    const token = uuid4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
        await prismaDB.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verificationToken = await prismaDB.verificationToken.create({
        data: {
            token,
            email,
            expires
        }
    })

    return verificationToken
}