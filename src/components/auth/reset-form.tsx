'use client'

import React, { useState, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ResetSchema, TResetInput } from '@/schemas'
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
import { reset } from '@/actions/reset-action'

export const ResetForm = () => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const [isPending, startTransition] = useTransition()

    const form = useForm<TResetInput>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: '',
        }
    })

    const resetState = () => {
        setError(false)
        setSuccess(false)
        setMessage('')
    }

    const onSubmit: SubmitHandler<TResetInput> = (data) => {
        resetState()
        
        startTransition(async () => {
            const res = await reset(data)

            if (res?.error) setError(true)
            if (res?.success) setSuccess(true)

            setMessage(res?.message)
        })
    }

    return (
        <CardWrapper
        backBtnLabel='Back to login'
        backBtnHref='/auth/login'
            headerLabel='Forgot your password'
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
                    {error && <FormError message={message} />}
                    {success && <FormSuccess message={message} />}
                    <Button
                        className='w-full'
                        type='submit'
                        disabled={isPending}
                    >
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
