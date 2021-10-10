import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import HomeMore from "./pages/HomeMore";
import MyPage from "./pages/MyPage";
import Habit from "./pages/Habit";
import Modal from "./components/Modal";
import HabitCreate from "./components/HabitCreate";
import HabitJoin from "./components/HabitJoin";
import Signing from "./components/Signing";

const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const App = () => {
  const { isLoginModal, isSignupModal, isHabitCreateModal, isHabitJoinModal } = useSelector(
    ({ modalReducer }) => modalReducer
  );

  const isModal = isLoginModal || isSignupModal || isHabitCreateModal || isHabitJoinModal;

  return (
    <BrowserRouter>
      <FlexContainer>
        <Nav />
        <FlexColumnContainer>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/more" component={HomeMore} />
            <Route path="/more/:id" component={HomeMore} />
            <Route path="/mypage" component={MyPage} />
            <Route path="/habit/:id" component={Habit} />
            <Redirect from="*" to="/" />
          </Switch>
        </FlexColumnContainer>
      </FlexContainer>
      {isModal && (
        <Modal>
          {isLoginModal && <Signing defaultType="로그인" />}
          {isSignupModal && <Signing defaultType="회원가입" />}
          {isHabitCreateModal && <HabitCreate />}
          {isHabitJoinModal && <HabitJoin />}
        </Modal>
      )}
    </BrowserRouter>
  );
};

export default App;
