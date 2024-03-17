import React from 'react'
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

interface Props {
    message?: string
}

export const FormSuccess = (props: Props) => {
    const {message} = props

    if (!message) return null

    return (
        <div className='flex gap-2 bg-emerald-500/15 text-emerald-500 rounded-md p-2.5'>
            <IoIosCheckmarkCircleOutline className='h-4 w-4' />
            <p className='text-xs'>
                {message}
            </p>
        </div>
    )
}
