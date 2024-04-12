import { BsExclamationDiamondFill } from "react-icons/bs"

import { CardWrapper } from "@/components/auth/card-wrapper"

export const ErrorCard = () => {
  return (
    <CardWrapper
        headerLabel="Oops, something went wrong"
        backBtnLabel="Back to login"
        backBtnHref="/auth/login"
    >
        <BsExclamationDiamondFill className="text-destructive mx-auto w-4 h-4" />
        <p className="text-center text-destructive text-xs pt-2">Email already in use with another provider</p>
    </CardWrapper>
  )
}
