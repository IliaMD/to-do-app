import React, { useState } from "react";
import styled from "styled-components";
import { Column } from "./components";
import { columns, Columns } from "./utils/mock";

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Wrapper>
      <Header>
        <SearchInput
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <PersonalBar>
          <Name>Ilya Babikov</Name>
        </PersonalBar>
      </Header>

      <Main>
        {columns.map((item, index) => (
          <Column searchValue={searchValue} key={index} name={item.name} />
        ))}
      </Main>
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

  @media screen and (max-width: 970px) {
    flex-wrap: wrap;
  }
`;

export default App;
