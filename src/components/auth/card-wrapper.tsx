import React from 'react'
import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Socials } from '@/components/auth/socials'
import { BackBtn } from '@/components/auth/back-btn'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

interface Props {
  children: React.ReactNode
  showSocials?: boolean
  headerLabel: string
  backBtnLabel: string
  backBtnHref: string
}

export const CardWrapper = (props: Props) => {
  const {
    children,
    showSocials,
    backBtnHref,
    backBtnLabel,
    headerLabel
  } = props
  return (
    <Card className=' w-[320px]'>
      <CardHeader>
        <h2 className={cn('font-semibold text-2xl drop-shadow-md text-center', poppins.className)}>
          🔐 Auth
        </h2>
        <p className="text-sm text-center">{headerLabel}</p>   
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocials && (
        <CardFooter>
          <Socials />
        </CardFooter>
      )}
          <CardFooter>
      <BackBtn href={backBtnHref} label={backBtnLabel} />
      </CardFooter>
    </Card>
  )
}
