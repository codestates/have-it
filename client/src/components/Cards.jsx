import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Card from "./Card";

const CardList = styled.div`
  margin: 0px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, auto));
  grid-gap: 15px;
  justify-items: stretch;
`;

const CardItem = styled.div`
  cursor: pointer;
  position: relative;
  top: 0;
  width: 100%;
  height: 0;
  padding-top: 60%;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  max-width: 360px;
`;

const Cards = ({ isAtHome, habits }) => {
  const { isLogin, habits: userhabits } = useSelector(({ authReducer }) => authReducer);
  return (
    <CardList isAtHome={isAtHome}>
      {habits.map((habit) => {
        let { color } = habit;
        let isJoin = false;
        if (isLogin && userhabits.find((userhabit) => userhabit.habitsId === habit.habitsId)) {
          isJoin = true;
          if (userhabits.done) {
            color = "#9EA0B8";
          }
        }
        return (
          <CardItem key={habit.habitsId} color={color}>
            <Card habit={habit} isJoin={isJoin} />
          </CardItem>
        );
      })}
    </CardList>
  );
};
Cards.defaultProps = {
  isAtHome: true,
};

Cards.propTypes = {
  isAtHome: PropTypes.bool,
  habits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Cards;
