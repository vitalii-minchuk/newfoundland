'use client'

import { sendEmail } from "@/lib/mail"
import { Button } from "@/components/ui/button"
import { testingEmailHtml } from "@/components/email/testing-email"

export const SendTestingEmailBtn = () => {
    const sendTestEmail = async () => {
        await sendEmail({
            to: 'mcmin4doutsch@gmail.com',
            subject: 'hello world',
            body: testingEmailHtml
        })
    }

  return (
    <Button onClick={sendTestEmail}>test em</Button>
  )
}
