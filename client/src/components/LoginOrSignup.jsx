import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  width: 17.5rem;

  * {
    width: 100%;
    margin: 1.5rem 0;

    * {
      border-radius: 0.375rem;
    }
  }
`;

const InputContainer = styled.div`
  * {
    margin: 0 0 0.5rem;
  }
`;

const Logo = styled.div`
  margin: 1rem auto;
  background-image: url("../images/logo/logo.svg");
  width: 3rem;
  height: 3rem;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  border: 1px solid var(--color-midgray);
  height: 2.5rem;
  padding: 0 0.5rem;
  font-size: 0.875rem;
  color: var(--color-black);
  ::placeholder {
    color: var(--color-midgray);
  }
`;

const Button = styled.button`
  border-radius: 0.375rem;
  font-family: Interop-SemiBold;
  height: 2.75rem;
  text-align: center;
`;

const LoginButton = styled(Button)`
  background-color: var(--color-mainblue);
  color: var(--color-white);
  margin: 0.5rem 0 1.5rem;

  :disabled {
    background-color: var(--color-darkblue);
  }

  :hover {
    background-color: var(--color-mainblue);
    opacity: 0.95;
  }
`;

const ToSwitchText = styled.div`
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;

  * {
    width: fit-content;
    margin: 0.25rem;
    color: var(--color-gray);
  }

  #toSwitch {
    cursor: pointer;
    :hover {
      text-decoration: underline;
      color: var(--color-mainblue);
      font-family: Interop-Semibold;
    }
  }
`;

const SocialContainer = styled.div`
  margin-bottom: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-midgray);
  position: relative;

  > span {
    margin: 0;
    padding: 0 0.4rem;
    width: fit-content;
    font-size: 0.8rem;
    font-family: Interop-Regular;
    position: absolute;
    top: calc(-0.4rem);
    left: calc(50% - 0.6rem);
    color: var(--color-midgray);
    background-color: var(--color-white);
  }
`;

const SocialLoginButton = styled(Button)`
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  margin: 0.25rem 0;

  :hover {
    background-color: ${(props) => props.color.slice(0, 7)}0D;
  }
`;

const Login = () => {
  const [type, setType] = useState("로그인");
  const [inputValue, setInputValue] = useState({ username: "", email: "", password: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSwitchClick = () => {
    if (type === "로그인") {
      setType("회원가입");
    } else {
      setType("로그인");
    }
  };

  const handleFindPasswordClick = () => {
    console.log("비밀번호 찾기");
  };

  return (
    <Form>
      <InputContainer>
        <Logo />
        <Title>{type}</Title>
        {type !== "로그인" && (
          <Input
            placeholder="username"
            type="text"
            name="username"
            value={inputValue.username}
            onChange={handleInputChange}
          />
        )}
        <Input
          placeholder="email"
          type="email"
          name="email"
          value={inputValue.email}
          onChange={handleInputChange}
        />
        <Input
          placeholder="password"
          type="password"
          name="password"
          value={inputValue.password}
          onChange={handleInputChange}
        />
        <LoginButton>{type}</LoginButton>
        <ToSwitchText>
          {type === "로그인" && (
            <button id="toSwitch" type="button" onClick={handleFindPasswordClick}>
              비밀번호를 잊어버리셨나요?
            </button>
          )}
        </ToSwitchText>
        <ToSwitchText>
          <>
            <span>{type === "로그인" ? "계정이 없으신가요?" : "이미 가입하셨나요?"}</span>
            <button id="toSwitch" type="button" onClick={handleSwitchClick}>
              {type === "로그인" ? "회원가입" : "로그인"}
            </button>
          </>
        </ToSwitchText>
      </InputContainer>
      <SocialContainer>
        <span>OR</span>
        <SocialLoginButton color="#03C75A">네이버로 로그인하기</SocialLoginButton>
        <SocialLoginButton color="#00000066">구글로 로그인하기</SocialLoginButton>
      </SocialContainer>
    </Form>
  );
};

export default Login;
