"use client";

import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import {signIn} from 'next-auth/react'

export const Socials = () => {
  const onClick =  (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className='flex items-center gap-x-1 w-full'>
        <Button variant='outline' className='w-full' onClick={() => onClick('google')}>
            <FcGoogle />
        </Button>
        <Button variant='outline' className='w-full' onClick={() => onClick('github')}>
            <FaGithub />
        </Button>
    </div>
  )
}
