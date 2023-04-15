import React from 'react';
import styled from 'styled-components';

interface TitleProps {
  titleText: string;
}

const ContentTitle = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  gap: 20px;

  h2 {
    width: fit-content;
    font-size: 1.6rem;
    position: relative;
  }

  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const Title = ({ titleText }: TitleProps) => {
  return (
    <ContentTitle>
      <h2>{titleText.toUpperCase()}</h2>
    </ContentTitle>
  );
};
