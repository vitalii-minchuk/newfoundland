import React from 'react'
import Link from 'next/link'

interface Props {
 href: string
 label: string
}

export const BackBtn = (props: Props) => {
    const {href, label} = props

    return (
        <Link className='w-full text-center text-xs hover:underline' href={href}>{label}</Link>
    )
}
