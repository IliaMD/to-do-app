import React, { useState } from "react";
import styled from "styled-components";
import { BsPlusCircle } from "react-icons/bs";
import { Card, ModalWindow } from "./components";
import { cards } from "./utils/mock";

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState(cards);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Wrapper>
      <Header>
        <SearchInput placeholder="Search" />
        <PersonalBar>
          <Name>Ilya Babikov</Name>
        </PersonalBar>
      </Header>

      <Main>
        <Column>
          <ColumnHeader>
            <ColumnName>To do</ColumnName>
            <Plus onClick={openModal} />
          </ColumnHeader>
          <Tasks>
            {tasks.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                priority={item.priority}
                description={item.description}
              />
            ))}
          </Tasks>
        </Column>
        <Column>
          <ColumnHeader>
            <ColumnName>In progress</ColumnName>
            <Plus />
          </ColumnHeader>
        </Column>
        <Column>
          <ColumnHeader>
            <ColumnName>Closed</ColumnName>
            <Plus />
          </ColumnHeader>
        </Column>
      </Main>
      <ModalWindow
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        setTasks={setTasks}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1200px;
  height: 100vh;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0.723437px 1.44687px 7.95781px rgba(148, 148, 148, 0.25);
  align-items: center;
`;

const SearchInput = styled.input`
  max-width: 500px;
  width: 100%;
  border: 0.7px solid #ebebeb;
  border-radius: 10px;
  padding: 5px 15px;

  ::placeholder {
    padding: 15px;
  }

  @media screen and (max-width: 800px) {
    margin-right: 25px;
    max-width: 50vw;
  }
`;

const PersonalBar = styled.div``;

const Name = styled.h2`
  cursor: pointer;

  @media screen and (max-width: 800px) {
    max-width: 100px;
    width: 100%;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: space-around;

  @media screen and (max-width: 750px) {
    flex-wrap: wrap;
  }
`;

const Column = styled.div`
  background: #f6f6f6;
  border-radius: 12px;
  min-height: 60vh;
  max-width: 230px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 750px) {
    margin: 25px 15px;
  }
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 15px;
`;

const ColumnName = styled.h3``;

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

export default App;
