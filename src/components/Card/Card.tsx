import React, { FC } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";

interface CardProps {
  title: string;
  priority: string;
  description: string;
  onDeleteCard: () => void;
  onChangeCard: () => void;
}

export const Card: FC<CardProps> = ({
  title,
  priority,
  description,
  onDeleteCard,
  onChangeCard,
}) => {
  return (
    <Root>
      <TaskHeader onClick={onChangeCard}>
        <TaskContent>
          <TaskTitle>{title}</TaskTitle>
          <Priority $variant={themes[`${priority}`]}>{priority}</Priority>
        </TaskContent>
        <TaskDescription>{description}</TaskDescription>
      </TaskHeader>
      <CardDelete onClick={onDeleteCard} />
    </Root>
  );
};

const Root = styled.div`
  background-color: #e0e4ea;
  padding: 20px 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
`;

const TaskHeader = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  flex: 1;
`;

const TaskContent = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const TaskTitle = styled.h3`
  font-weight: 500;
  font-size: 16px;
  margin-right: 10px;
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

const TaskDescription = styled.p`
  font-weight: 400;
  font-size: 15px;
`;
