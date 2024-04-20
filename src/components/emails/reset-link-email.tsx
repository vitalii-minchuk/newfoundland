import * as React from 'react';
import { Html } from '@react-email/html';
import { Link } from '@react-email/link';
import { Tailwind } from '@react-email/tailwind';
import { render } from '@react-email/render';

interface Props {
  link: string
}

function ResetLinkEmail(props: Props) {
  const {link} = props

  return (
    <Html lang="en">
      <Tailwind>
        <Link className=' cursor-pointer' href={link}>reset link</Link>
      </Tailwind>
    </Html>
  );
}

export const resetPasswordLinkEmailHtml = (link: string) => render(<ResetLinkEmail link={link} />);