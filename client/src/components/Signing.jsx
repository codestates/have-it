import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signInAction, modalOffAction } from "../store/actions";
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
  const history = useHistory();

  const validator = {
    // [????????? ?????? ??????]: ?????? ?????? ????????? ?????? && ?????? ?????????
    // TODO: ?????? ?????? ?????? ?????? ??????
    username: (username) => {
      // TODO: ?????? ?????? (?????? ????????? & ???????????? ?????? ??????)
      const usernameResult = /^[A-Za-z][A-Za-z0-9]*$/.test(username);
      if (username === "") {
        setUsernameMessage("???????????? ???????????????.");
        setUsernameValid(false);
      } else if (!usernameResult) {
        setUsernameMessage("????????? ??? ?????? ??????????????????.");
        setUsernameValid(false);
      } else {
        setUsernameMessage(null);
        setUsernameValid(true);
      }
    },
    // [????????? ?????? ??????]: ????????? ????????? ????????? ?????? && ?????? ?????????
    email: (email) => {
      const emailResult =
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
          email
        );
      // TODO: ?????? ?????? ?????? ?????? ??????
      const emailHistory = false;
      // const emailSocialHistory = "?????????";

      if (email === "") {
        setEmailMessage("???????????? ???????????????.");
        setEmailValid(false);
        setHasSocialHistory(false);
      } else if (!emailResult) {
        setEmailMessage("???????????? ?????? ??????????????????.");
        setEmailValid(false);
        setHasSocialHistory(false);
      } else if (emailHistory) {
        setEmailMessage("?????? ????????? ??????????????????.");
        setEmailValid(false);
        setHasSocialHistory(false);
        // } else if (emailSocialHistory) {
        //   setEmailMessage(`${emailSocialHistory}??? ???????????? ????????? ???????????????.`);
        //   setEmailValid(true);
        //   setHasSocialHistory(true);
      } else {
        setEmailMessage(null);
        setEmailValid(true);
        setHasSocialHistory(false);
      }
    },
    // [????????? ?????? ??????]: ?????? 8??? ???????????????, ???????????? ?????? ??? ????????????(@$!%*#?&)??? ?????? ?????? ??????
    password: (password) => {
      const passwordResult = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      );
      if (password === "") {
        setPasswordMessage("??????????????? ???????????????.");
        setPasswordValid(false);
      } else if (type === "????????????" && !passwordResult) {
        // TODO: ???????????? ?????? ??????
        setPasswordMessage("????????? ??? ?????? ?????????????????????.");
        setPasswordValid(false);
      } else {
        setPasswordMessage(null);
        setPasswordValid(true);
      }
    },
  };

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
    validator[name](value);

    if (name === "username") {
      const nickRes = await authApi.checkNickname(value);
      if (nickRes.status === 202) {
        setUsernameMessage("?????? ?????? ?????? ??????????????????.");
        setUsernameValid(false);
      }
    } else if (name === "email") {
      const emailRes = await authApi.checkEmail(value);
      if (emailRes.status === 202) {
        const { sns } = emailRes.data.data;
        let place;
        switch (sns) {
          case "naver":
            place = "?????????";
            break;
          case "google":
            place = "??????";
            break;
          default:
            place = "?????????";
            break;
        }
        if (sns === "local" && type === "?????????") return;
        setEmailMessage(`${place}??? ???????????? ????????? ???????????????.`);
        setEmailValid(false);
      }
    }
  };

  const handleSwitchClick = () => {
    if (type === "?????????") {
      setType("????????????");
    } else {
      setType("?????????");
    }
  };

  const handleFindPasswordClick = () => {
    console.log("???????????? ??????");
  };

  const handleSignInClick = async (e) => {
    e.preventDefault();
    if (type === "?????????") {
      const res = await authApi.signin(inputValue.email, inputValue.password);

      if (res.status === 202) {
        setPasswordMessage(res.data.message);
      }
      if (res.status === 200) {
        dispatch(signInAction(res.data.data));
        dispatch(modalOffAction);
        history.push("/mypage");
      }
    } else if (type === "????????????") {
      const res = await authApi.signup(inputValue.username, inputValue.email, inputValue.password);

      if (res.status === 202) {
        setPasswordMessage(res.data.message);
      }
      if (res.status === 201) {
        dispatch(signInAction(res.data.data));
        dispatch(modalOffAction);
        history.push("/mypage");
      }
    }
  };

  const handleNaverLogInClick = () => {
    window.location.assign(
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=gU3sc0sPkwozCUCshHU9&redirect_uri=http://localhost:3000/mypage&state=naver"
    );
  };

  const handleGoogleLogInClick = () => {
    window.location.assign(
      "https://accounts.google.com/o/oauth2/v2/auth?client_id=88250044350-uah7b99j7folulhid7e6lvudke8ifqd6.apps.googleusercontent.com&redirect_uri=http://localhost:3000/mypage&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
    );
  };

  useEffect(() => {
    setInputValue({ username: "", email: "", password: "" });
    if (type === "????????????") {
      setUsernameValid(false);
    } else if (type === "?????????") {
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
        {type !== "?????????" && (
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
          {type === "?????????" && (
            <button className="toSwitch" type="button" onClick={handleFindPasswordClick}>
              ??????????????? ??????????????????????
            </button>
          )}
        </ToSwitchText>
        <ToSwitchText>
          <>
            <span>{type === "?????????" ? "????????? ????????????????" : "?????? ???????????????????"}</span>
            <button className="toSwitch" type="button" onClick={handleSwitchClick}>
              {type === "?????????" ? "????????????" : "?????????"}
            </button>
          </>
        </ToSwitchText>
      </InputContainer>
      <SocialContainer>
        <span>OR</span>
        <SocialLoginButton type="button" onClick={handleNaverLogInClick} color="#03C75A">
          ???????????? ???????????????
        </SocialLoginButton>
        <SocialLoginButton type="button" onClick={handleGoogleLogInClick} color="#00000066">
          ????????? ???????????????
        </SocialLoginButton>
      </SocialContainer>
    </Form>
  );
};

Signing.propTypes = {
  defaultType: PropTypes.string.isRequired,
};

export default Signing;
