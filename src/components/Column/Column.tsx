import React, { FC, useState } from "react";
import styled from "styled-components";
import { BsPlusCircle, BsTrash } from "react-icons/bs";
import { Card } from "../Card";
import { cards, CardsType, ColumnsType } from "../../utils/mock";
import { ModalWindow } from "../ModalWindow";
import { v4 as uuidv4 } from "uuid";

interface ColumnProps {
  searchValue: string;
  name: string;
  columnId: string;
  onDeleteColumn: (columnId: string) => void;
}

export const Column: FC<ColumnProps> = ({
  searchValue,
  name,
  columnId,
  onDeleteColumn,
}) => {
  const [columnNameChange, setColumnNameChange] = useState(false);
  const [columnName, setColumnName] = useState(name.toUpperCase());
  const [tasks, setTasks] = useState(cards);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  function handleTitleValue(e: any) {
    setTitleValue(e.target.value);
  }

  function handleDescriptionValue(e: any) {
    setDescriptionValue(e.target.value);
  }

  function handleChangeCard(id: string) {
    setIsOpen(true);
    setIsEditMode(true);
    setTaskId(id);

    const task = tasks.find((item) => item.id === id);

    if (task) {
      setTitleValue(task?.title);
      setDescriptionValue(task?.description);
    }
  }

  function handleAddTask(
    priorityText: string,
    titleValue: string,
    descriptionValue: string,
    id: string
  ) {
    setTitleValue("");
    setDescriptionValue("");
    if (!isEditMode) {
      let card = {
        title: titleValue,
        priority: priorityText,
        description: descriptionValue,
        id: uuidv4(),
        columnId: columnId,
      };
      closeModal();
      setTasks((prev) => [...prev, card]);
    } else {
      const editableCard = tasks.find((item) => item.id === id);

      if (editableCard) {
        editableCard.title = titleValue;
        editableCard.description = descriptionValue;
        editableCard.priority = priorityText;
        closeModal();
      }
    }
  }

  function closeModal() {
    setIsOpen(false);
    setIsEditMode(false);
    setTitleValue("");
    setDescriptionValue("");
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
    const newTasks = tasks.filter((item) => item.id !== id);
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

          .map((item) => (
            <Card
              key={item.id}
              title={item.title}
              priority={item.priority}
              description={item.description}
              onDeleteCard={() => onDeleteCard(item.id)}
              onChangeCard={() => handleChangeCard(item.id)}
            />
          ))}
      </Tasks>
      <ColumnDelBlock>
        <ColumnDelete onClick={() => onDeleteColumn(columnId)} />
      </ColumnDelBlock>
      <ModalWindow
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        onAddNewTask={handleAddTask}
        taskId={taskId}
        onDescriptionValue={descriptionValue}
        onTitleValue={titleValue}
        onHandleDescriptionValue={handleDescriptionValue}
        onHandleTitleValue={handleTitleValue}
      />
    </Root>
  );
};

const ColumnDelete = styled(BsTrash)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: none;
  color: #a463c4;
`;

const Root = styled.div`
  background: #f6f6f6;
  border-radius: 12px;
  min-height: 60vh;
  max-width: 320px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 15px 15px;

  &:hover ${ColumnDelete} {
    display: block;
  }
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 15px;
  align-items: center;
`;

const ColumnName = styled.h3`
  cursor: pointer;
  font-weight: 700;
  font-size: 20px;
`;

const ColumnNameInput = styled.input``;

const Plus = styled(BsPlusCircle)`
  background-color: #9aa0e2;
  border: none;
  border-radius: 13px;
  color: white;
  cursor: pointer;
  width: 25px;
  height: 25px;
`;

const Tasks = styled.div`
  padding: 15px 15px;
  flex: 1;
`;

const ColumnDelBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px;
`;
