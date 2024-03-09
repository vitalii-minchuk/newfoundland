import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '../ui/button'

export const Socials = () => {
  return (
    <div className='flex items-center gap-x-1 w-full'>
        <Button variant='outline' className='w-full'>
            <FcGoogle />
        </Button>
        <Button variant='outline' className='w-full'>
            <FaGithub />
        </Button>
    </div>
  )
}
