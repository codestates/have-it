import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Habit from "./pages/Habit";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Auth from "./components/Auth";
import HabitCreate from "./components/HabitCreate";
import HabitJoin from "./components/HabitJoin";

const App = () => {
  const isModal = false;
  const isAuthModal = false;
  const isHabitCreateModal = false;
  const isHabitJoinModal = false;
  return (
    <BrowserRouter>
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
