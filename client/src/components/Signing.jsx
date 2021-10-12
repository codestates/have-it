import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { signInAction, modalOffAction, findHabitsAction } from "../store/actions";
import authApi from "../api/auth";

const Form = styled.form`
  width: 18.75rem;

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
  border: 1px solid ${(props) => (props.message ? props.color : "var(--color-midgray)")};
  height: 2.5rem;
  padding: 0 0.5rem;
  font-size: 0.875rem;
  color: var(--color-black);
  ::placeholder {
    color: var(--color-midgray);
  }
`;

const AlertMessage = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.color};
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

  :hover {
    background-color: var(--color-mainblue);
    opacity: 0.9;
  }

  :disabled {
    color: var(--color-lightgray);
    background-color: var(--color-darkblue);
    opacity: 0.8;
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

  .toSwitch {
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

const Signing = ({ defaultType }) => {
  const [type, setType] = useState(defaultType);
  const [inputValue, setInputValue] = useState({ username: "", email: "", password: "" });
  const [usernameValid, setUsernameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState(null);
  const [emailMessage, setEmailMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [hasSocialHistory, setHasSocialHistory] = useState(false);
  const [usernameColor, setUsernameColor] = useState("var(--color-midgray)");
  const [emailColor, setEmailColor] = useState("var(--color-midgray)");
  const [passwordColor, setPasswordColor] = useState("var(--color-midgray)");
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();

  const validator = {
    // [유효성 검증 함수]: 영어 또는 숫자만 가능 && 중복 불가능
    // TODO: 중복 여부 체크 로직 추가
    username: (username) => {
      // TODO: 로직 변경 (최소 글자수 & 특수문자 포함 여부)
      const usernameResult = /^[A-Za-z][A-Za-z0-9]*$/.test(username);
      if (username === "") {
        setUsernameMessage("닉네임을 입력하세요.");
        setUsernameValid(false);
      } else if (!usernameResult) {
        setUsernameMessage("사용할 수 없는 닉네임입니다.");
        setUsernameValid(false);
      } else {
        setUsernameMessage(null);
        setUsernameValid(true);
      }
    },
    // [유효성 검증 함수]: 유효한 이메일 형식만 가능 && 중복 불가능
    email: (email) => {
      const emailResult =
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
          email
        );
      // TODO: 중복 여부 체크 로직 추가
      const emailHistory = false;
      const emailSocialHistory = "네이버";

      if (email === "") {
        setEmailMessage("이메일을 입력하세요.");
        setEmailValid(false);
        setHasSocialHistory(false);
      } else if (!emailResult) {
        setEmailMessage("유효하지 않은 이메일입니다.");
        setEmailValid(false);
        setHasSocialHistory(false);
      } else if (emailHistory) {
        setEmailMessage("이미 가입된 이메일입니다.");
        setEmailValid(false);
        setHasSocialHistory(false);
      } else if (emailSocialHistory) {
        setEmailMessage(`${emailSocialHistory}로 로그인한 이력이 존재합니다.`);
        setEmailValid(true);
        setHasSocialHistory(true);
      } else {
        setEmailMessage(null);
        setEmailValid(true);
        setHasSocialHistory(false);
      }
    },
    // [유효성 검증 함수]: 최소 8자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&)는 하나 이상 포함
    password: (password) => {
      const passwordResult = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      );
      if (password === "") {
        setPasswordMessage("비밀번호를 입력하세요.");
        setPasswordValid(false);
      } else if (type === "회원가입" && !passwordResult) {
        // TODO: 비밀번호 조건 표시
        setPasswordMessage("사용할 수 없는 비밀번호입니다.");
        setPasswordValid(false);
      } else {
        setPasswordMessage(null);
        setPasswordValid(true);
      }
    },
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
    validator[name](value);
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

  const handleSignInClick = (e) => {
    // TODO: 로그인 요청
    e.preventDefault();
    const data = authApi.signin(inputValue.email, inputValue.password);
    data.then((res) => {
      console.log(res);
      dispatch({ ...signInAction, payload: res.data.user });
      dispatch({ ...findHabitsAction, payload: res.data.user });
      console.log("로그인 완료");
    });

    // TODO: 받아온 정보 state에 업데이트
    dispatch(modalOffAction);
    dispatch(signInAction);
  };

  const handleSocialLogInClick = () => {
    // TODO: 소셜 로그인 요청
    console.log("소셜 로그인 완료");
    // TODO: 받아온 정보 state에 업데이트
    dispatch(modalOffAction);
    dispatch(signInAction);
  };

  useEffect(() => {
    setInputValue({ username: "", email: "", password: "" });
    if (type === "회원가입") {
      setUsernameValid(false);
    } else if (type === "로그인") {
      setUsernameValid(true);
    }
    setEmailValid(false);
    setPasswordValid(false);
    setUsernameMessage(null);
    setEmailMessage(null);
    setPasswordMessage(null);
    setHasSocialHistory(false);
    setIsDisabled(true);
  }, [type]);

  useEffect(() => {
    if (usernameValid && emailValid && passwordValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [usernameValid, emailValid, passwordValid]);

  useEffect(() => {
    if (usernameMessage) {
      setUsernameColor("var(--color-red)");
    } else {
      setUsernameColor("var(--color-midgray)");
    }
    if (emailMessage) {
      if (hasSocialHistory) {
        setEmailColor("var(--color-mainblue)");
      } else {
        setEmailColor("var(--color-red)");
      }
    } else {
      setEmailColor("var(--color-midgray)");
    }
    if (passwordMessage) {
      setPasswordColor("var(--color-red)");
    } else {
      setPasswordColor("var(--color-midgray)");
    }
  }, [usernameMessage, emailMessage, passwordMessage, hasSocialHistory]);

  return (
    <Form>
      <InputContainer>
        <Logo />
        <Title>{type}</Title>
        {type !== "로그인" && (
          <>
            <Input
              placeholder="username"
              type="text"
              name="username"
              value={inputValue.username}
              onChange={handleInputChange}
              message={usernameMessage}
              color={usernameColor}
            />
            {usernameMessage && (
              <AlertMessage className="icon-attention-2" color={usernameColor}>
                {usernameMessage}
              </AlertMessage>
            )}
          </>
        )}
        <Input
          placeholder="email"
          type="email"
          name="email"
          value={inputValue.email}
          onChange={handleInputChange}
          message={emailMessage}
          color={emailColor}
        />
        {emailMessage && (
          <AlertMessage className="icon-attention-2" color={emailColor}>
            {emailMessage}
          </AlertMessage>
        )}
        <Input
          placeholder="password"
          type="password"
          name="password"
          value={inputValue.password}
          onChange={handleInputChange}
          message={passwordMessage}
          color={passwordColor}
        />
        {passwordMessage && (
          <AlertMessage className="icon-attention-2" color={passwordColor}>
            {passwordMessage}
          </AlertMessage>
        )}
        <LoginButton disabled={isDisabled} onClick={handleSignInClick}>
          {type}
        </LoginButton>
        <ToSwitchText>
          {type === "로그인" && (
            <button className="toSwitch" type="button" onClick={handleFindPasswordClick}>
              비밀번호를 잊어버리셨나요?
            </button>
          )}
        </ToSwitchText>
        <ToSwitchText>
          <>
            <span>{type === "로그인" ? "계정이 없으신가요?" : "이미 가입하셨나요?"}</span>
            <button className="toSwitch" type="button" onClick={handleSwitchClick}>
              {type === "로그인" ? "회원가입" : "로그인"}
            </button>
          </>
        </ToSwitchText>
      </InputContainer>
      <SocialContainer>
        <span>OR</span>
        <SocialLoginButton onClick={handleSocialLogInClick} color="#03C75A">
          네이버로 로그인하기
        </SocialLoginButton>
        <SocialLoginButton onClick={handleSocialLogInClick} color="#00000066">
          구글로 로그인하기
        </SocialLoginButton>
      </SocialContainer>
    </Form>
  );
};

Signing.propTypes = {
  defaultType: PropTypes.string.isRequired,
};

export default Signing;
