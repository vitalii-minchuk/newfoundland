import React from 'react'

import { CardWrapper } from './card-wrapper'

export const LoginForm = () => {
  return (
    <CardWrapper
        backBtnLabel={`Don't have an account?`}
        backBtnHref='/auth/register'
        headerLabel='Welcome back'
        showSocials
    >
        Login-form
    </CardWrapper>
  )
}
