import React, { FC, useState, useMemo } from "react";
import styled from "styled-components";
import { BsPlusCircle, BsTrash } from "react-icons/bs";
import { Card } from "../Card";
import { ModalWindow } from "../ModalWindow";
import { v4 as uuidv4 } from "uuid";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import {
  createNewCard,
  deleteCard,
  changeCard,
  dragCardtoColumn,
} from "../../store/Cards";
import { changeName } from "../../store/Columns";
import { useDrop } from "react-dnd";

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

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "card",

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),

    drop: (monitor: any) => {
      dispatch(dragCardtoColumn({ id: monitor.itemID, columnId: columnId }));
    },
  }));

  function handleChangeCard(id: string) {
    setIsOpen(true);
    setIsEditMode(true);
    setCardId(id);
    setTitleValue(cards[id].title);
    setDescriptionValue(cards[id].description);
  }

  function handleAddChangeTask(
    priorityText: string,
    titleValue: string,
    descriptionValue: string,
    cardId: string
  ) {
    if (!isEditMode) {
      if (titleValue.trim()) {
        dispatch(
          createNewCard({
            title: titleValue,
            priority: priorityText,
            description: descriptionValue,
            columnId: columnId,
            id: uuidv4(),
          })
        );
      }
    } else {
      dispatch(
        changeCard({
          id: cardId,
          title: titleValue,
          description: descriptionValue,
          priority: priorityText,
        })
      );
    }
    closeModal();
  }

  function closeModal() {
    setIsOpen(false);
    setIsEditMode(false);
    setTitleValue("");
    setDescriptionValue("");
  }

  function onEnterChangeName(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      setColumnNameChange(false);
      dispatch(changeName({ name: columnName, columnId: columnId }));
    }
  }

  function onBlurChangeName() {
    setColumnNameChange(false);
    dispatch(changeName({ name: columnName, columnId: columnId }));
  }

  function onDeleteCard(id: string) {
    dispatch(deleteCard(cards[id]));
  }

  const filteredCards = useMemo(
    () => Object.values(cards).filter((card) => card.columnId === columnId),
    [cards, columnId]
  );

  return (
    <Root ref={drop}>
      <ColumnHeader>
        {columnNameChange ? (
          <ColumnNameInput
            value={columnName}
            onKeyDown={onEnterChangeName}
            onChange={(e) => setColumnName(e.target.value)}
            onBlur={onBlurChangeName}
            autoFocus
          />
        ) : (
          <ColumnName onClick={() => setColumnNameChange(true)}>
            {columnName}
          </ColumnName>
        )}
        <Plus onClick={() => setIsOpen(true)} />
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
              cardId={item.id}
            />
          ))}
      </Tasks>
      <ColumnDelBlock>
        <ColumnDelete onClick={() => onDeleteColumn(columnId)} />
      </ColumnDelBlock>
      <ModalWindow
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        onAddNewTask={handleAddChangeTask}
        taskId={cardId}
        onDescriptionValue={descriptionValue}
        onTitleValue={titleValue}
        onHandleDescriptionValue={(e: any) =>
          setDescriptionValue(e.target.value)
        }
        onHandleTitleValue={(e: any) => setTitleValue(e.target.value)}
      />
    </Root>
  );
};

const ColumnDelete = styled(BsTrash)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  visibility: hidden;
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
    visibility: visible;
  }
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 15px;
  align-items: flex-start;
`;

const ColumnName = styled.h3`
  cursor: pointer;
  font-weight: 700;
  font-size: 20px;
  text-overflow: ellipsis;
  word-wrap: break-word;
  max-width: 250px;
  width: 100%;
  line-height: 1;
`;

const ColumnNameInput = styled.input`
  max-width: 250px;
  width: 100%;
`;

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
