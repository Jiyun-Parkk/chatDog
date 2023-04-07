import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';

const CustomHeader = styled.header<{ route: string }>`
  display: ${({ route }) => (route.includes('chat') ? 'none' : 'block')};
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  background: rgba(255, 255, 255, 0.2);
  div {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;

    h1 {
      white-space: nowrap;
      font-size: 1.1rem;
    }
    img {
      background: skyblue;
      border-radius: 20px;
    }
  }
`;

export const Header = () => {
  const router = useRouter();
  const handleClickLogo = () => {
    router.push('/');
  };
  return (
    <CustomHeader route={router.pathname}>
      <div onClick={handleClickLogo}>
        <Image src="/static/images/profile.png" width={40} height={40} alt="logo" />
        <h1>챗독</h1>
      </div>
    </CustomHeader>
  );
};
