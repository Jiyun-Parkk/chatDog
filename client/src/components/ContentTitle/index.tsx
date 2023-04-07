import React from 'react';
import styled from 'styled-components';

interface TitleProps {
  titleText: string;
  subtext: string;
}

const ContentTitle = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  gap: 20px;

  h2 {
    width: fit-content;
    font-size: 1.2rem;
    position: relative;
    &:before {
      content: '';
      width: 100%;
      height: 10px;
      position: absolute;
      bottom: 3px;
      left: 10px;
      z-index: -1;
      background: rgba(182, 46, 63, 0.4);
    }
  }
  span {
    font-size: 0.8em;
    color: darkblue;
  }
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const Title = ({ titleText, subtext }: TitleProps) => {
  return (
    <ContentTitle>
      <h2>{titleText.toUpperCase()} DOG</h2>
      <span>{subtext} </span>
    </ContentTitle>
  );
};
