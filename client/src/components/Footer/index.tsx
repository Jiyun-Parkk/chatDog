import React from 'react';
import styled from 'styled-components';

const CustomFooter = styled.footer`
  width: 100%;
  background: #2c3333;
  color: #fff;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Footer = () => {
  return (
    <CustomFooter>
      <p>© 참치타워</p>
    </CustomFooter>
  );
};
