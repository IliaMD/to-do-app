import React, { FC, useState, useMemo } from "react";
import styled from "styled-components";
import { BsPlusCircle, BsTrash } from "react-icons/bs";
import { Card } from "../Card";
import { ModalWindow } from "../ModalWindow";
import { v4 as uuidv4 } from "uuid";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { createNewCard, deleteCard, changeCard } from "../../store/Cards";

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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [cardId, setCardId] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const cards = useAppSelector((state: RootState) => state.card);
  const dispatch = useAppDispatch();

  function handleTitleValue(e: any) {
    setTitleValue(e.target.value);
  }

  function handleDescriptionValue(e: any) {
    setDescriptionValue(e.target.value);
  }

  function handleChangeCard(id: string) {
    setIsOpen(true);
    setIsEditMode(true);
    setCardId(id);
    setTitleValue(cards[id].title);
    setDescriptionValue(cards[id].description);
  }

  function handleAddTask(
    priorityText: string,
    titleValue: string,
    descriptionValue: string,
    cardId: string
  ) {
    setTitleValue("");
    setDescriptionValue("");
    if (!isEditMode) {
      closeModal();
      dispatch(
        createNewCard({
          title: titleValue,
          priority: priorityText,
          description: descriptionValue,
          columnId: columnId,
          id: uuidv4(),
        })
      );
    } else {
      dispatch(
        changeCard({
          id: cardId,
          title: titleValue,
          description: descriptionValue,
          priority: priorityText,
        })
      );
      closeModal();
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
    dispatch(deleteCard(cards[id]));
  }

  const filteredCards = useMemo(
    () => Object.values(cards).filter((card) => card.columnId === columnId),
    [cards, columnId]
  );

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
        {filteredCards
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
        taskId={cardId}
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
