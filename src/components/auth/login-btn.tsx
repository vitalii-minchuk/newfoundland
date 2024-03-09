"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export const LoginBtn = () => {
    const router = useRouter()

    const onClick = () => {
        const path = '/auth/login'
        router.push(path)
    }

    return (
        <Button
            size='sm'
            variant='secondary'
            className='w-full'
            onClick={onClick}
        >
            Sign in
        </Button>
    )
}
