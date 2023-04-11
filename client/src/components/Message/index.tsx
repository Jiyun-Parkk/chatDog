import React from 'react';
import Image from 'next/image';

interface MessageProps {
  chatter: 'assistant' | 'user';
  message: string;
}

// eslint-disable-next-line react/display-name
export const Message = React.forwardRef<HTMLLIElement, MessageProps>(
  ({ chatter, message }, ref) => {
    return (
      <li className={chatter} ref={ref}>
        {chatter === 'assistant' && (
          <Image src="/static/images/profile.png" width={40} height={40} alt="profile" priority />
        )}
        <p dangerouslySetInnerHTML={{ __html: message }}></p>
      </li>
    );
  }
);
