import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../styles/fontello/css/fontello.css";
import { Switch, Route, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInModalOnAction, signUpModalOnAction, signOutAction } from "../store/actions";
import categoriesApi from "../api/categories";
import authApi from "../api/auth";
import habitsApi from "../api/habits";

const HeaderContatiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100vw - 5rem);
  height: 6rem;
  background-color: var(--color-white);
  padding: 0px 40px 0px 40px;
  border-bottom: 1px solid var(--color-midgray);
`;

const PageInfoContainer = styled.div`
  font-family: Interop-Bold;
  flex-grow: 10;
  font-size: 2rem;
`;

const VerticalBar = styled.div`
  background-color: var(--color-midgray);
  width: 1px;
  height: 1rem;
  margin: 0rem 1rem;
`;

const ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
`;

const ProfileContainer = styled.div`
  font-family: Interop-Bold;
  font-size: 1.25rem;
  margin: 0rem 1rem 0rem 1rem;
`;

const AuthContainer = styled.button`
  font-family: Interop-Medium;
  color: var(--color-gray);
  font-size: 1rem;
  margin: 0rem 0.5rem;
`;

const GoHomeContainer = styled.div`
  margin-left: -2rem;
`;

const I = styled.i`
  margin: 0;
`;

const CategoryTitle = () => {
  const history = useHistory();
  const handleBackwardClick = () => {
    history.push("/");
  };
  const { urlTitle } = useParams();
  const [headerTitle, setHeaderTitle] = useState("");
  useEffect(() => {
    const getCategroyList = async (title) => {
      const res = await categoriesApi.getCategoryByEnTitle(title);
      setHeaderTitle(res.data.category.title);
    };
    getCategroyList(urlTitle);
  }, [urlTitle]);

  return (
    <>
      <GoHomeContainer onClick={handleBackwardClick}>
        <I className="icon-left-open-mini" style={{ fontSize: "50px" }} />
      </GoHomeContainer>
      <PageInfoContainer>{headerTitle}</PageInfoContainer>
    </>
  );
};

const PageTitle = () => {
  const [headerTitle, setHeaderTitle] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const getTitle = async () => {
      const res = await habitsApi.getTitle(id);
      console.log(res);
      setHeaderTitle(res.data.title);
    };
    getTitle(id);
  }, [id]);
  console.log("headerTitle", headerTitle);
  console.log("id", id);
  return <>{headerTitle}👏</>;
};

const Header = () => {
  const { isLogin, nickname, image } = useSelector(({ authReducer }) => authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignIn = () => {
    dispatch(signInModalOnAction);
  };

  const handleSignOut = async () => {
    await authApi.signout();
    dispatch(signOutAction);
    history.push("/");
  };

  const handleSignUp = () => {
    dispatch(signUpModalOnAction);
  };

  return (
    <>
      <HeaderContatiner>
        <Switch>
          <Route exact path="/" render={() => <PageInfoContainer>오늘의 해빗</PageInfoContainer>} />
          <Route path="/more/:urlTitle" render={() => <CategoryTitle />} />
          <Route path="/mypage" render={() => <PageInfoContainer>마이 페이지</PageInfoContainer>} />
          <Route
            path="/habit/:id"
            render={() => (
              <PageInfoContainer>
                <PageTitle />
              </PageInfoContainer>
            )}
          />
        </Switch>
        {isLogin ? (
          <>
            <ProfileImage src={image || "../images/profile/pf_1.svg"} />
            <ProfileContainer>{nickname}</ProfileContainer>
            <AuthContainer onClick={handleSignOut}>로그아웃</AuthContainer>
          </>
        ) : (
          <>
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
