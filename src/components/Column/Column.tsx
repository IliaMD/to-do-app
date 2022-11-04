import React, { FC, useState } from "react";
import styled from "styled-components";
import { BsPlusCircle } from "react-icons/bs";
import { Card } from "../Card";
import { cards } from "../../utils/mock";
import { ModalWindow } from "../ModalWindow";

type ColumnProps = {
  searchValue: string;
  name: string;
};

export const Column: FC<ColumnProps> = ({ searchValue, name }) => {
  const [columnNameChange, setColumnNameChange] = useState(false);
  const [columnName, setColumnName] = useState(name);
  const [tasks, setTasks] = useState(cards);
  const [modalIsOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function onEnterName(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      setColumnNameChange(false);
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function onColumnName() {
    setColumnNameChange(true);
  }

  function onDeleteCard(id: string) {
    const newTasks = tasks.filter((item) => item.id != id);
    setTasks(newTasks);
  }

  return (
    <Root>
      <ColumnHeader>
        {columnNameChange ? (
          <ColumnNameInput
            value={columnName}
            onKeyDown={onEnterName}
            onChange={(e) => setColumnName(e.target.value)}
            onBlur={() => setColumnNameChange(false)}
            autoFocus
          />
        ) : (
          <ColumnName onClick={onColumnName}>{columnName}</ColumnName>
        )}
        <Plus onClick={openModal} />
      </ColumnHeader>
      <Tasks>
        {tasks
          .filter(
            (item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.priority.toLowerCase().includes(searchValue.toLowerCase())
          )

          .map((item, index) => (
            <Card
              key={index}
              title={item.title}
              priority={item.priority}
              description={item.description}
              onDeleteCard={() => onDeleteCard(item.id)}
            />
          ))}
      </Tasks>
      <ModalWindow
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        setTasks={setTasks}
      />
    </Root>
  );
};

const Root = styled.div`
  background: #f6f6f6;
  border-radius: 12px;
  min-height: 60vh;
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 970px) {
    margin: 25px 15px;
  }
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 15px;
`;

const ColumnName = styled.h3`
  cursor: pointer;
`;

const ColumnNameInput = styled.input``;

const Plus = styled(BsPlusCircle)`
  background-color: #67cb65;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
`;

const Tasks = styled.div`
  padding: 15px 15px;
`;
