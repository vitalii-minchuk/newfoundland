import * as zod from 'zod'

export const LoginSchema = zod.object({
    email: zod.string().email({message: 'Email is required'}),
    password: zod.string().min(1, {message: 'Password is required'})
})

export const RegisterSchema = zod.object({
    email: zod.string().email({message: 'Email is required'}),
    password: zod.string().min(1, {message: 'Password is required'}),
    name: zod.string().min(1, {message: 'Name is required'})
})

export type TLoginInput = zod.infer<typeof LoginSchema>
export type TRegisterInput = zod.infer<typeof RegisterSchema>