import React, { useState } from "react";
import styled from "styled-components";
import { Column } from "./components";
import { columns, ColumnsType } from "./utils/mock";
import logo from "./assets/img/logo.png";
import "./assets/styles/fonts.css";
import { FcAddColumn } from "react-icons/fc";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [newColumns, setNewColumns] = useState(columns);

  function handleCreateColumn() {
    setNewColumns([
      ...newColumns,
      { name: "New", columnId: newColumns.length + 1 },
    ]);
  }

  return (
    <Wrapper>
      <Header>
        <HeaderContent>
          <Logo src={logo} />
          <HeaderText>
            <HeaderTitle>Universe</HeaderTitle>
            <HeaderSlogan>Your working space in your universe</HeaderSlogan>
          </HeaderText>
        </HeaderContent>
        <PersonalBar>
          <Name>Ilya Babikov</Name>
        </PersonalBar>
      </Header>

      <Main>
        <MainContent>
          <MainCreateBlock>
            <MainTitle>Here you can manage your tasks</MainTitle>
            <CreateColumnBlock>
              <MainText>Сreate a column</MainText>
              <CreateColumn onClick={handleCreateColumn} />
            </CreateColumnBlock>
          </MainCreateBlock>
          <SearchInput
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </MainContent>
        <Columns>
          {newColumns.map((item, index) => (
            <Column
              searchValue={searchValue}
              key={index}
              name={item.name}
              columnId={item.columnId}
              changeColumns={() => setNewColumns(newColumns)}
              allColumns={newColumns}
            />
          ))}
        </Columns>
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  margin: auto;
  font-family: "Noto Nastaliq Urdu";
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  box-shadow: 0.77px 1.4px 7.9px rgba(148, 148, 148, 0.25);
  align-items: center;
`;

const SearchInput = styled.input`
  max-width: 500px;
  width: 100%;
  border: 0.7px solid #ebebeb;
  border-radius: 10px;
  padding: 5px 15px;
  margin: 10px 15px;
  height: 30px;

  ::placeholder {
    padding: 15px;
  }

  @media screen and (max-width: 800px) {
    margin-right: 25px;
    max-width: 50vw;
  }
`;

const Logo = styled.img`
  width: 90px;
  height: 90px;
  margin-right: 20px;

  @media screen and (max-width: 400px) {
    display: none;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 400px) {
    margin: 0 10px 10px 10px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #a463c4;
`;

const HeaderSlogan = styled.p`
  color: #9aa0e2;
`;

const PersonalBar = styled.div``;

const Name = styled.h2`
  cursor: pointer;

  @media screen and (max-width: 800px) {
    max-width: 100px;
    width: 100%;
  }
`;

const Main = styled.div``;

const MainTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 15px;

  @media screen and (max-width: 470px) {
    flex-direction: column;
  }
`;

const MainCreateBlock = styled.div`
  margin: 10px 0 15px 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 400px;
  width: 100%;
  background: #f6f6f6;
  border-radius: 12px;
  padding: 10px 10px;

  @media screen and (max-width: 470px) {
    width: 60%;
    margin: auto;
  }
`;

const CreateColumnBlock = styled.div`
  display: flex;
  align-items: center;
`;

const MainText = styled.p`
  margin-right: 5px;
`;

const CreateColumn = styled(FcAddColumn)`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const Columns = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0px 15px;
`;

export default App;
