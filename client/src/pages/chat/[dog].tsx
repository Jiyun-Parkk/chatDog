import { useRouter } from 'next/router';
import React from 'react';

const Chat = () => {
  const router = useRouter();
  return <div>{router.query.dog}</div>;
};

export default Chat;
