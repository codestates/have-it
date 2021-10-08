import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Habit from "./pages/Habit";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Auth from "./components/Auth";
import HabitCreate from "./components/HabitCreate";
import HabitJoin from "./components/HabitJoin";

const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const App = () => {
  const { isAuthModal, isHabitCreateModal, isHabitJoinModal } = useSelector(
    ({ modalReducer }) => modalReducer
  );

  const isModal = isAuthModal || isHabitCreateModal || isHabitJoinModal;

  return (
    <BrowserRouter>
      <FlexContainer>
        <Nav />
        <FlexColumnContainer>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/mypage" component={MyPage} />
            <Route path="/habit/:id" component={Habit} />
            <Redirect from="*" to="/" />
          </Switch>
        </FlexColumnContainer>
      </FlexContainer>
      {isModal && (
        <Modal>
          {isAuthModal && <Auth />}
          {isHabitCreateModal && <HabitCreate />}
          {isHabitJoinModal && <HabitJoin />}
        </Modal>
      )}
    </BrowserRouter>
  );
};

export default App;
