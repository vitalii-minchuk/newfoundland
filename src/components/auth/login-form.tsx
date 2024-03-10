'use client'

import React, { useState, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginSchema, TLoginInput } from '@/schemas'
import { CardWrapper } from '@/components/auth/card-wrapper'
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/auth/form-error'
import { FormSuccess } from '@/components/auth/form-success'
import { login } from '@/actions/login-action'

export const LoginForm = () => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const [isPending, startTransition] = useTransition()

    const form = useForm<TLoginInput>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const resetState = () => {
        setError(false)
        setSuccess(false)
        setMessage('')
    }

    const onSubmit: SubmitHandler<TLoginInput> = (data) => {
        resetState()
        
        startTransition(async () => {
            const res = await login(data)

            if (res?.error) setError(true)
            if (res?.success) setSuccess(true)

            setMessage(res?.message)
        })
    }

    return (
        <CardWrapper
            backBtnLabel={`Don't have an account?`}
            backBtnHref='/auth/register'
            headerLabel='Welcome back'
            showSocials
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField control={form.control} name='email' render={({field}) => (
                        <FormItem>
                            <FormLabel className='text-xs'>Email</FormLabel>
                            <FormControl>
                                <Input {...field} type='email' disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name='password' render={({field}) => (
                        <FormItem>
                            <FormLabel className='text-xs'>Password</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type='password'
                                    placeholder='******'
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    {error && <FormError message={message} />}
                    {success && <FormSuccess message={message} />}
                    <Button
                        className='w-full'
                        type='submit'
                        disabled={isPending}
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
