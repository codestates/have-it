import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Habit from "./pages/Habit";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Auth from "./components/Auth";
import HabitCreate from "./components/HabitCreate";
import HabitJoin from "./components/HabitJoin";
import { habitCreateModalOnAction } from "./store/actions";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthModal, isHabitCreateModal, isHabitJoinModal } = useSelector(
    ({ modalReducer }) => modalReducer
  );
  const isModal = isAuthModal || isHabitCreateModal || isHabitJoinModal;

  return (
    <BrowserRouter>
      <button
        type="button"
        onClick={() => {
          dispatch(habitCreateModalOnAction);
        }}
      >
        habitCreateModalOnAction
      </button>
      <Nav />
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/mypage" component={MyPage} />
          <Route path="/habit/:id" component={Habit} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
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
