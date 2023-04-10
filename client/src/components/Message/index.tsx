import React from 'react';
import Image from 'next/image';

interface MessageProps {
  chatter: 'assistant' | 'user';
  message: string;
}

export const Message = ({ chatter, message }: MessageProps) => {
  return (
    <li className={chatter}>
      {chatter === 'assistant' && (
        <Image src="/static/images/profile.png" width={40} height={40} alt="profile" priority />
      )}
      <p>{message}</p>
    </li>
  );
};
