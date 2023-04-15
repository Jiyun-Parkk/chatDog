import React from 'react';
import styled from 'styled-components';

const CustomFooter = styled.footer`
  width: 100%;
  color: #000;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
`;

export const Footer = () => {
  return (
    <CustomFooter>
      <p>© 2023 참치타워.All right reserved.</p>
    </CustomFooter>
  );
};
