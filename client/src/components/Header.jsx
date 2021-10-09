import React from "react";
import styled from "styled-components";
import "../styles/fontello/css/fontello.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authModalOnAction, signInAction, signOutAction } from "../store/actions";

const HeaderContatiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100vw - 80px);
  height: 96px;
  background-color: var(--color-white);
  padding: 0px 40px 0px 40px;
  border-bottom: 1px solid var(--color-midgray);
`;

const PageInfoContainer = styled.div`
  font-family: Interop-Bold;
  flex-grow: 10;
  font-size: 32px;
`;

const VerticalBar = styled.div`
  background-color: var(--color-midgray);
  width: 1px;
  height: 16px;
`;

const ProfileContainer = styled.div`
  font-family: Interop-Bold;
  font-size: 20px;
  margin: 0px 8px;
`;

const AuthContainer = styled.button`
  font-family: Interop-Medium;
  color: var(--color-gray);
  font-size: 16px;
  margin: 0px 8px;
`;

const GoHomeContainer = styled.div`
  margin-left: -30px;
`;

const I = styled.i`
  margin: 0;
`;

const Header = () => {
  const { isLogin } = useSelector(({ authReducer }) => authReducer);
  const history = useHistory();
  const location = history.location.pathname;
  const handleBackwardClick = () => {
    history.push("/");
  };

  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(signInAction);
  };

  const handleSignOut = () => {
    dispatch(signOutAction);
  };

  const handleSignUp = () => {
    dispatch(authModalOnAction);
  };

  return (
    <>
      <HeaderContatiner>
        {isLogin ? (
          <>
            {location === "/" ? (
              <PageInfoContainer>오늘의 해빗</PageInfoContainer>
            ) : (
              <>
                <GoHomeContainer onClick={handleBackwardClick}>
                  <I className="icon-left-open-mini" style={{ fontSize: "50px" }} />
                </GoHomeContainer>
                <PageInfoContainer>💪🏻 운동 해빗</PageInfoContainer>
              </>
            )}
            <i className="icon-user" style={{ fontSize: "30px" }} />
            <ProfileContainer>Leezy_kim</ProfileContainer>
            <AuthContainer onClick={handleSignOut}>로그아웃</AuthContainer>
          </>
        ) : (
          <>
            <PageInfoContainer>오늘의 해빗</PageInfoContainer>
            <i className="icon-user" style={{ fontSize: "30px" }} />
            <AuthContainer onClick={handleSignIn}>로그인</AuthContainer>
            <VerticalBar />
            <AuthContainer onClick={handleSignUp} style={{ color: "#4D4DFF" }}>
              회원가입
            </AuthContainer>
          </>
        )}
      </HeaderContatiner>
    </>
  );
};

export default Header;
