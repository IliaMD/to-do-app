import styled from "styled-components";
import { ImWarning } from "react-icons/im";

export const Form = () => {
  return (
    <Root>
      <Main>
        <Title>Login</Title>
        <Login>Full Name</Login>
        <LoginInput />
        <Password>Password</Password>
        <PasswordInput
          placeholder="Minimum 8 characters"
          $variant={invalidThemes["validInput"]}
        />
        <PassInvalidBlock $variant={invalidThemes["validMsg"]}>
          <PassInvalidImg />
          <PassInvalidSpan>
            Password must be 8 characters or longer!
          </PassInvalidSpan>
        </PassInvalidBlock>
        <LoginBtn>Enter in the Universe</LoginBtn>
      </Main>
    </Root>
  );
};

const Root = styled.div`
  height: 1000px;
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

const LoginInput = styled.input`
  border: 1px solid #d6d9de;
  border-radius: 9px;
  padding: 0 20px 0 36px;
  height: 40px;
  margin-bottom: 20px;

  &:hover {
    border-color: #adb3bd;
  }
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

const PassInvalidBlock = styled.div<{
  $variant: () => string;
}>`
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  ${({ $variant }) => $variant}
`;

const invalidThemes: { [key: string]: () => string } = {
  invalidMsg: () => `
    visibility: visible;
    `,
  validMsg: () => `
    visibility: hidden;
    `,
  invalidInput: () => `
    border-color:#e04f44;
    `,
  validInput: () => `
  border-color: #d6d9de;
    `,
};

const PassInvalidImg = styled(ImWarning)`
  color: #e04f44;
  margin-right: 5px;
  width: 12px;
  height: 12px;
`;

const PassInvalidSpan = styled.span`
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
