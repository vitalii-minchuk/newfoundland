import * as React from 'react';
import { Html } from '@react-email/html';
import { Button } from '@react-email/button';
import { Text } from '@react-email/text';
import { Tailwind } from '@react-email/tailwind';
import { render } from '@react-email/render';

function TestingEmail() {
  return (
    <Html lang="en">
      <Tailwind>
        <Button className='rounded-md border-red-100' href="https://google.com">Click send</Button>
        <Text className='text-lg text-indigo-700'>hello from app</Text>
      </Tailwind>
    </Html>
  );
}

export const testingEmailHtml = render(<TestingEmail />);