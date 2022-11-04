import React, { FC } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";

interface CardProps {
  title: string;
  priority: string;
  description: string;
  onDeleteCard: () => void;
}

export const Card: FC<CardProps> = ({
  title,
  priority,
  description,
  onDeleteCard,
}) => {
  return (
    <Root>
      <TaskHeader>
        <TaskTitle>{title}</TaskTitle>
        <Priority $variant={themes[`${priority}`]}>{priority}</Priority>
        <CardDelete onClick={onDeleteCard} />
      </TaskHeader>
      <TaskDescription>{description}</TaskDescription>
    </Root>
  );
};

const Root = styled.div`
  background-color: #e0e4ea;
  padding: 20px 20px;
  border-radius: 12px;
  margin-bottom: 15px;
`;

const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const TaskTitle = styled.h3`
  margin-right: 10px;
  font-weight: 500;
  font-size: 15px;
`;

const CardDelete = styled(GrClose)`
  cursor: pointer;
`;

const Priority = styled.p<{
  $variant: () => string;
}>`
  font-size: 11px;
  padding: 1px 5px;
  border-radius: 10px;
  color: white;
  ${({ $variant }) => $variant}
`;

const themes: { [key: string]: () => string } = {
  high: () => `
  background-color: #e74444;  
  `,
  medium: () => `
  background-color: #ff9533;
  `,
  low: () => `
  background-color: #67cb65;
  `,
};

const TaskDescription = styled.p``;
