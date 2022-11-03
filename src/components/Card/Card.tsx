import React, { FC } from "react";
import styled from "styled-components";

interface CardProps {
  title: string;
  priority: string;
  description: string;
}

export const Card: FC<CardProps> = ({ title, priority, description }) => {
  return (
    <Root>
      <TaskHeader>
        <TaskTitle>{title}</TaskTitle>
        <Priority>{priority}</Priority>
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
`;

const TaskTitle = styled.h3`
  margin-right: 10px;
  font-weight: 500;
  font-size: 15px;
`;

const Priority = styled.p`
  font-size: 11px;
  padding: 1px 5px;
  background-color: #e74444;
  border-radius: 10px;
  color: white;
`;

const TaskDescription = styled.p``;
