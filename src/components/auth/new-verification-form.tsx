"use client"

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {BeatLoader} from 'react-spinners'

import { CardWrapper } from "./card-wrapper"
import { newVerification } from '@/actions/new-verification'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'

export const NewVerificationForm = () => {
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const searchParams = useSearchParams()
  const token = searchParams?.get('token')

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing token!')
      return
    }

      newVerification(token).then((res) => {
        setError(res.error ?? '')
        setSuccess(res.success ?? '')
      })
    .catch(() => setError('Something went wrong!'))
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper 
      headerLabel="Confirm your verification"
      backBtnHref="/auth/login"
      backBtnLabel="Back to login"
    >
        <div className="flex justify-center items-center w-full h-3">
          {!success && !error && <BeatLoader color="#2563EB" />}
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
    </CardWrapper>
  )
}
