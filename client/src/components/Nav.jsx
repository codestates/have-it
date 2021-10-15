import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../styles/fontello/css/fontello.css";
import { useDispatch, useSelector } from "react-redux";
import { Emoji } from "emoji-mart";
import { signInModalOnAction, habitCreateModalOnAction } from "../store/actions";

const NavContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  min-width: 5rem;
  height: 100vh;
  background-color: var(--color-lightgray);
  z-index: 10;
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
  background-color: var(--color-lightblue--02);
  color: var(--color-white);
  border-radius: 1.5rem;
  width: 3rem;
  height: 3rem;
`;

const MenuButton = styled(Button)`
  :hover {
    background-color: var(--color-lightblue--04);
  }
`;

const LinkRouter = styled(Link)`
  width: max-content;
`;

const EnlargeContainer = styled.div`
  width: 15rem;
  margin-left: 12rem;
  border-radius: 1.5rem;
  margin-bottom: 1rem;
  background-color: ${(props) => props.backgroundColor};
`;

const WhiteBackground = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: var(--color-lightblue--04);
  background-color: var(--color-white);
  border-radius: 1.5rem;
  :hover {
    width: max-content;
    div {
      visibility: visible;
    }
  }
`;

const HabitButtonContainer = styled(Button)`
  background-color: ${(props) => props.backgroundColor};
  opacity: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  color: var(--color-white);
  border-radius: 1.5rem;
  border: 2px solid;
  border-color: ${(props) => {
    console.log("color", props.borderColor);

    return props.borderColor;
  }};
  width: 3rem;
  height: 3rem;
  transition: width 1s ease;
  padding: 0rem 0.6rem;
  :hover {
    width: auto;
    max-width: 20rem;
    div {
      visibility: visible;
    }
  }
`;

const HabitButtonBox = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
`;

const Habit = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  color: var(--color-white);
  visibility: hidden;
  margin-left: 0.5rem;
  font-size: 0.75rem;
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
  :hover {
    background-color: var(--color-mainblue);
  }
`;

const Nav = () => {
  const { isLogin } = useSelector(({ authReducer }) => authReducer);
  const userInfo = useSelector(({ authReducer }) => authReducer);
  const dispatch = useDispatch();

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
                <i className="icon-home" style={{ fontSize: "26px", color: "#4D4DFF" }} />
              </MenuButton>
            </Link>
            <Link to="/mypage">
              <MenuButton>
                <i className="icon-user" style={{ fontSize: "26px", color: "#4D4DFF " }} />
              </MenuButton>
            </Link>
          </MenuContainer>
          <Divider />
          <HabitContainer>
            {isLogin &&
              userInfo.habits.map((habit) => (
                <LinkRouter key={habit.id} to={`/habit/${habit.habitsId}`}>
                  <EnlargeContainer>
                    <WhiteBackground>
                      <HabitButtonContainer
                        backgroundColor={habit.color}
                        borderColor={(() => {
                          const deci = parseInt(habit.color.substring(1), 16) - 8000;
                          const hex = deci.toString(16);
                          return `#${hex}`;
                        })()}
                      >
                        <HabitButtonBox>
                          <Emoji emoji={habit.emojiId} size={20} />
                          <Habit> {habit.title}</Habit>
                        </HabitButtonBox>
                      </HabitButtonContainer>
                    </WhiteBackground>
                  </EnlargeContainer>
                </LinkRouter>
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
