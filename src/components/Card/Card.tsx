import React, { FC } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { useDrag } from "react-dnd";

interface CardProps {
  title: string;
  priority: string;
  description: string;
  onDeleteCard: () => void;
  onChangeCard: () => void;
  cardId: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { title, priority, description, onDeleteCard, onChangeCard, cardId },
    ref
  ) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "card",
      item: { itemID: cardId },
      collect: (monitor) => ({
        item: monitor.getItem(),
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <Root ref={drag}>
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
  }
);

const Root = styled.div`
  background-color: #e0e4ea;
  padding: 20px 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 365px) {
    padding: 10px 10px;
  }
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

  @media screen and (max-width: 260px) {
    flex-direction: column;
  }
`;

const TaskTitle = styled.h3`
  font-weight: 500;
  font-size: 16px;
  margin-right: 10px;
  max-width: 170px;
  width: 100%;
  text-overflow: ellipsis;
  word-wrap: break-word;

  @media screen and (max-width: 350px) {
    max-width: 140px;
    width: 100%;
  }
  @media screen and (max-width: 295px) {
    max-width: 100px;
    width: 100%;
  }
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
  height: 14px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 260px) {
    width: 34px;
  }

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
  max-width: 170px;
  width: 100%;
  text-overflow: ellipsis;
  word-wrap: break-word;

  @media screen and (max-width: 350px) {
    max-width: 140px;
    width: 100%;
  }
  @media screen and (max-width: 295px) {
    max-width: 100px;
    width: 100%;
  }
`;
