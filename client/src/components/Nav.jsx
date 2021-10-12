import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../styles/fontello/css/fontello.css";
import { useDispatch, useSelector } from "react-redux";
import { signInModalOnAction, habitCreateModalOnAction } from "../store/actions";

const NavContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  min-width: 5rem;
  height: 100vh;
  background-color: var(--color-lightgray);
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 3rem;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  height: 6rem;
  img {
    width: 3rem;
    height: 3rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 1.5rem 0rem;
`;

const MenuContainer = styled(Container)`
  flex-basis: 7rem;
`;

const HabitContainer = styled(Container)`
  flex-basis: calc(100vh - 25rem);
  justify-content: start;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-midgray--04);
  color: var(--color-white);
  border-radius: 5px;
  width: 3rem;
  height: 3rem;
`;

const MenuButton = styled(Button)``;
const HabitButton = styled(Button)`
  margin-bottom: 1rem;
`;

const Divider = styled.div`
  border-top: 1px solid #9ea0b8;
  border-radius: 1px;
  width: 3rem;
  height: 1px;
`;

const HabitCreateContainer = styled(Container)`
  flex-basis: 3rem;
`;
const HabitCreateButton = styled(Button)`
  font-size: 2rem;
  background-color: var(--color-mainblue);
`;

const Nav = () => {
  const { isLogin } = useSelector(({ authReducer }) => authReducer);
  const dispatch = useDispatch();

  const dummy = [
    { id: 1, title: "달리기", color: "red", icon: "123" },
    { id: 2, title: "집중 50분, 10분 휴식 지키기", color: "red", icon: "123" },
    { id: 3, title: "하루 2L 물마시기", color: "red", icon: "123" },
    { id: 4, title: "12가지 인생의 법칙!", color: "red", icon: "123" },
    { id: 5, title: "달리기", color: "red", icon: "123" },
    { id: 6, title: "집중 50분, 10분 휴식 지키기", color: "red", icon: "123" },
    { id: 7, title: "하루 2L 물마시기", color: "red", icon: "123" },
    { id: 8, title: "12가지 인생의 법칙!", color: "red", icon: "123" },
    { id: 9, title: "달리기", color: "red", icon: "123" },
    { id: 10, title: "집중 50분, 10분 휴식 지키기", color: "red", icon: "123" },
    { id: 11, title: "하루 2L 물마시기", color: "red", icon: "123" },
    { id: 12, title: "12가지 인생의 법칙!", color: "red", icon: "123" },
  ];

  const handleSignIn = () => {
    dispatch(signInModalOnAction);
  };

  const handleCreatehabit = () => {
    dispatch(habitCreateModalOnAction);
  };

  return (
    <>
      <NavContainer>
        <FlexContainer>
          <Logo to="/">
            <img alt="logo" src="../images/logo/logo.svg" />
          </Logo>
          <MenuContainer>
            <Link to="/">
              <MenuButton>
                <i className="icon-home" style={{ fontSize: "26px", color: "white " }} />
              </MenuButton>
            </Link>
            <Link to="/mypage">
              <MenuButton>
                <i className="icon-user" style={{ fontSize: "26px", color: "white " }} />
              </MenuButton>
            </Link>
          </MenuContainer>
          <Divider />
          <HabitContainer>
            {isLogin &&
              dummy.map((el) => (
                <Link key={el.id} to={`/habit/${el.id}`}>
                  <HabitButton>{el.id}</HabitButton>
                </Link>
              ))}
          </HabitContainer>
          <Divider />
          <HabitCreateContainer>
            {isLogin ? (
              <HabitCreateButton onClick={handleCreatehabit}>+</HabitCreateButton>
            ) : (
              <HabitCreateButton onClick={handleSignIn}>+</HabitCreateButton>
            )}
          </HabitCreateContainer>
        </FlexContainer>
      </NavContainer>
    </>
  );
};

export default Nav;
