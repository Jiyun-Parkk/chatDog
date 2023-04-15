import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { MdChevronLeft } from 'react-icons/md';
import { Button } from '@mui/material';

const CustomHeader = styled.header<{ route: string }>`
  width: 100%;
  z-index: 20;
  background: rgba(255, 255, 255, 0.5);
  .back-btn {
    color: #000;
    aspect-ratio: 1 / 1;
    font-size: 32px;
    display: flex;
    margin-left: -16px;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
  }
`;

export const Header = () => {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };
  return (
    <CustomHeader route={router.pathname}>
      <Button className="back-btn" onClick={handleClickBack}>
        <MdChevronLeft />
      </Button>
    </CustomHeader>
  );
};
