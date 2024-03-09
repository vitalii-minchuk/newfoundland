'use client'

import React, { useState, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { RegisterSchema, TRegisterInput } from '@/schemas'
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

export const RegisterForm = () => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const [isPending, startTransition] = useTransition()

    const form = useForm<TRegisterInput>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        }
    })

    const resetState = () => {
        setError(false)
        setSuccess(false)
        setMessage('')
    }

    const onSubmit: SubmitHandler<TRegisterInput> = (data) => {
        resetState()
        
        startTransition(async () => {
            const res = await login(data)

            if (res?.error) setError(true)
            if (res?.success) setSuccess(true)

            setMessage(res.message)
        })
    }

    return (
        <CardWrapper
            backBtnLabel='Already have an account?'
            backBtnHref='/auth/login'
            headerLabel='Create an account'
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
                    <FormField control={form.control} name='name' render={({field}) => (
                        <FormItem>
                            <FormLabel className='text-xs'>Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type='text'
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
