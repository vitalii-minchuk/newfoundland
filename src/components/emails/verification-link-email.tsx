import * as React from 'react';
import { Html } from '@react-email/html';
import { Link } from '@react-email/link';
import { Tailwind } from '@react-email/tailwind';
import { render } from '@react-email/render';

interface Props {
  link: string
}

function VerificationLinkEmail(props: Props) {
  const {link} = props

  return (
    <Html lang="en">
      <Tailwind>
        <Link className=' cursor-pointer' href={link}>pls verify ur emil</Link>
      </Tailwind>
    </Html>
  );
}

export const verificationLinkEmailHtml = (link: string) => render(<VerificationLinkEmail link={link} />);