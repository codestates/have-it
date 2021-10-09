import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../styles/fontello/css/fontello.css";
import { useDispatch, useSelector } from "react-redux";
import { authModalOnAction } from "../store/actions";

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 80px;
  height: 100%;
  background-color: var(--color-lightgray);
  padding: 15px 0px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  width: 48px;
  height: calc(100vh - 30px);
`;

const LogoContainer = styled.div`
  width: 48px;
  height: 48px;
  border-style: none;
`;

const MenuContainer = styled.div`
  font-size: 12px;
`;

const HabitContainer = styled.div`
  overflow: scroll;
  margin-bottom: 100px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const HabitCreateContainer = styled.div`
  position: absolute;
  bottom: 15px;
`;

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-midgray);
  color: var(--color-white);
  border-radius: 5px;
  width: 48px;
  height: 48px;
  margin: 10px 0px;
`;

const HabitJoinButton = styled(Button)`
  background-color: var(--color-mainblue);
`;

const Divider = styled.div`
  border-top: 3px solid #9ea0b8;
  border-radius: 1px;
  width: 48px;
  margin: 15px 0px;
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

  const handleSignInModalOn = () => {
    dispatch(authModalOnAction);
  };

  const handlehabitCreateModalOn = () => {
    dispatch(authModalOnAction);
  };

  return (
    <>
      <NavContainer>
        <FlexContainer>
          <LogoContainer>
            <img alt="logo" src={`${process.env.PUBLIC_URL}/assets/android-icon-48x48.png`} />
          </LogoContainer>
          <EmptyContainer />
          <MenuContainer>
            <Link to="/">
              <Button>
                <i className="icon-home" style={{ fontSize: "26px", color: "white " }} />
              </Button>
            </Link>
            <Link to="/mypage">
              <Button>
                <i className="icon-user" style={{ fontSize: "26px", color: "white " }} />
              </Button>
            </Link>
          </MenuContainer>
          <Divider />
          <HabitContainer>
            {isLogin &&
              dummy.map((el) => (
                <Link key={el.id} to={`/habit/${el.id}`}>
                  <Button>{el.id}</Button>
                </Link>
              ))}
          </HabitContainer>
          <HabitCreateContainer>
            <Divider />
            {isLogin ? (
              <HabitJoinButton onClick={handlehabitCreateModalOn}>+</HabitJoinButton>
            ) : (
              <HabitJoinButton onClick={handleSignInModalOn}>+</HabitJoinButton>
            )}
          </HabitCreateContainer>
        </FlexContainer>
      </NavContainer>
    </>
  );
};

export default Nav;
