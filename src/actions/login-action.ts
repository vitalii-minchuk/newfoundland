"use server"

import * as zod from 'zod'

import { LoginSchema, TLoginInput } from "@/schemas"

export const login = async (input: TLoginInput) => {
    const validatedData = LoginSchema.safeParse(input)

    if (!validatedData.success) {
        return {error: true, message: 'Invalid fields'}
    }

    return {success: true, message: 'Logged in'}
}