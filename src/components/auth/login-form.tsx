'use client'

import React from 'react'
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

export const LoginForm = () => {
    const form = useForm<TLoginInput>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const onSubmit: SubmitHandler<TLoginInput> = (data) => {

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
                                <Input {...field} type='email' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name='password' render={({field}) => (
                        <FormItem>
                            <FormLabel className='text-xs'>Password</FormLabel>
                            <FormControl>
                                <Input {...field} type='password' placeholder='******' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    {true && <FormError message='semeememe' />}
                    {true && <FormSuccess message='semeememe' />}
                    <Button className='w-full' type='submit'>Submit</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
