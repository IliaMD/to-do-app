import React, { FC, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { buttons, Cards, cards } from "../../utils/mock";

interface ModalWindowProps {
  closeModal: () => void;
  modalIsOpen: boolean;
  setTasks: (card: Cards[]) => void;
}

export const ModalWindow: FC<ModalWindowProps> = ({
  closeModal,
  modalIsOpen,
  setTasks,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [onPriorityAdd, setOnPriorityAdd] = useState(cards);

  function onPriorityClick(priorityText: string) {
    let card = {
      title: titleValue,
      priority: priorityText,
      description: descriptionValue,
    };

    closeModal();
    setOnPriorityAdd([...onPriorityAdd, card]);
    setTasks([...onPriorityAdd, card]);
  }

  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div>Column Name</div>
      <ModalForm>
        <ModalInput
          placeholder="Add a task"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <ModalText
          placeholder="Add a description"
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
        />
        <ModalPriorityTitle>Choose a priority:</ModalPriorityTitle>
        <ModalPriority>
          {buttons.map((item, index) => {
            return (
              <PriorityBtn
                $variant={themes[item.themes]}
                onClick={() => onPriorityClick(item.text)}
                key={index}
              >
                {item.text}
              </PriorityBtn>
            );
          })}
        </ModalPriority>
      </ModalForm>
    </Modal>
  );
};

const ModalForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalInput = styled.input`
  padding: 5px 5px;
  margin: 10px;
  border: 0.7px solid #ebebeb;
  border-radius: 10px;
  ::placeholder {
    font-size: 14px;
    font-weight: 500;
  }
`;

const ModalText = styled.textarea`
  height: 100px;
  margin: 10px;
  border: 0.7px solid #ebebeb;
  border-radius: 10px;
  padding: 5px 5px;

  ::placeholder {
    font-size: 14px;
    font-weight: 500;
  }
`;

const ModalPriorityTitle = styled.h3``;

const ModalPriority = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
`;

const PriorityBtn = styled.button<{
  $variant: () => string;
}>`
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 2px 5px;
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
