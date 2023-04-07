import React from 'react';
import styled from 'styled-components';

const CustomHeader = styled.header`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

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
    div {
      width: 40px;
      height: 40px;
      background: url('static/images/profile.png') no-repeat center / cover, skyblue;
      border-radius: 20px;
    }
  }
`;

export const Header = () => {
  return (
    <CustomHeader>
      <div>
        <div />
        <h1>챗독</h1>
      </div>
    </CustomHeader>
  );
};
