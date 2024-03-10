import React from 'react'
import { BsExclamationTriangle } from "react-icons/bs"

interface Props {
    message?: string
}

export const FormError = (props: Props) => {
    const {message} = props

    if (!message) return null

    return (
        <div className='flex gap-2 bg-destructive/15 text-destructive rounded-md p-2.5'>
            <BsExclamationTriangle className='h-4 w-4' />
            <p className='text-xs'>
            {message}
            </p>
        </div>
    )
}
