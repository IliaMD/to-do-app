import styled from "styled-components";
import { ImWarning } from "react-icons/im";
import React, { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { create } from "../../store/Auth";

export const Form = () => {
  const [loginValue, setLoginValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [changeBorder, setChangeBorder] = useState("validInput");
  const [addInvalidMsgPass, setAddInvalidMsgPass] = useState("validMsgPass");
  const [addInvalidMsgLogin, setInvalidMsgLogin] = useState("validMsgLogin");

  const dispatch = useAppDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (loginValue.trim().length === 0 && passValue.trim().length < 7) {
      setChangeBorder("invalidInput");
      setAddInvalidMsgPass("invalidMsgPass");
      setInvalidMsgLogin("invalidMsgLogin");
    } else if (loginValue.trim().length === 0) {
      setInvalidMsgLogin("invalidMsgLogin");
    } else if (passValue.trim().length < 7) {
      setChangeBorder("invalidInput");
      setAddInvalidMsgPass("invalidMsgPass");
    } else {
      setChangeBorder("validInput");
      setAddInvalidMsgPass("validMsgPass");
      setInvalidMsgLogin("validMsgLogin");

      dispatch(create({ login: loginValue, password: passValue }));

      setLoginValue("");
      setPassValue("");
    }
  };

  return (
    <Root>
      <Main>
        <Title>Login</Title>
        <Login>Full Name</Login>
        <LoginInput
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
          $variant={invalidThemes[changeBorder]}
        />
        <LoginInvalidBlock $variant={invalidThemes[addInvalidMsgLogin]}>
          <InvalidImg />
          <InvalidSpan>Enter your name</InvalidSpan>
        </LoginInvalidBlock>
        <Password>Password</Password>
        <PasswordInput
          placeholder="Minimum 8 characters"
          $variant={invalidThemes[changeBorder]}
          value={passValue}
          onChange={(e) => setPassValue(e.target.value)}
        />
        <PassInvalidBlock $variant={invalidThemes[addInvalidMsgPass]}>
          <InvalidImg />
          <InvalidSpan>Password must be 8 characters or longer!</InvalidSpan>
        </PassInvalidBlock>
        <LoginBtn onClick={handleSubmit}>Enter in the Universe</LoginBtn>
      </Main>
    </Root>
  );
};

const Root = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2a2e34;

  background: radial-gradient(
    ellipse at right bottom,
    #aeb3ea 5%,
    #9aa0e2 25%,
    #a463c4 50%,
    #330f5a 100%
  );
`;

const Main = styled.form`
  max-width: 360px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 60px 55px;
  background-color: white;
  border-radius: 10px;
  z-index: 100;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 20px;
`;

const Login = styled.label`
  padding: 0 0 9px 2px;
  font-size: 12px;
`;

const LoginInput = styled.input<{ $variant: () => string }>`
  border: 1px solid #d6d9de;
  border-radius: 9px;
  padding: 0 20px 0 36px;
  height: 40px;

  &:hover {
    border-color: #adb3bd;
  }
  ${({ $variant }) => $variant}
`;

const Password = styled.label`
  padding: 0 0 9px 2px;
  font-size: 12px; ;
`;

const PasswordInput = styled.input<{ $variant: () => string }>`
  border: 1px solid;
  border-color: #d6d9de;
  border-radius: 9px;
  padding: 0 20px 0 36px;
  height: 40px;

  &:hover {
    border-color: #adb3bd;
  }

  ${({ $variant }) => $variant}
`;

const LoginInvalidBlock = styled.div<{
  $variant: () => string;
}>`
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  ${({ $variant }) => $variant}
`;

const PassInvalidBlock = styled.div<{
  $variant: () => string;
}>`
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  ${({ $variant }) => $variant}
`;

const invalidThemes: { [key: string]: () => string } = {
  invalidMsgPass: () => `
    visibility: visible;
    `,
  validMsgPass: () => `
    visibility: hidden;
    `,
  invalidInput: () => `
    border-color:#e04f44;

    &:hover {
      border-color: #e04f44;
    }
    `,
  validInput: () => `
  border-color: #d6d9de;
    `,
  invalidMsgLogin: () => `
    visibility: visible;
    `,
  validMsgLogin: () => `
    visibility: hidden;
    `,
};

const InvalidImg = styled(ImWarning)`
  color: #e04f44;
  margin-right: 5px;
  width: 12px;
  height: 12px;
`;

const InvalidSpan = styled.span`
  color: #e04f44;
  font-size: 14px;
`;

const LoginBtn = styled.button`
  transition: background-color 0.2s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s;
  background-color: #7b68ee;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  width: 100%;
  box-shadow: 0 10px 25px #7b68ee80;
  font-size: 18px;
  font-weight: 700;
  color: white;
  border: none;

  &:hover {
    background-color: #5f48ea;
  }
`;
