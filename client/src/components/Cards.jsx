import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "./Card";

const CardList = styled.div`
  margin: ${(props) => props.isAtHome && "40px"};
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, auto));
  grid-gap: 15px;
  justify-items: stretch;
`;

const CardItem = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  height: 0;
  padding-top: 60%;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  max-width: 360px;
`;

const Cards = ({ isAtHome }) => {
  const dummy = [
    {
      id: 1,
      title: "달리기",
      icon: "🏃🏻",
      color: "#46DBA0",
      count: 5,
      users: [
        "../images/profile/pf_1.svg",
        "../images/profile/pf_3.svg",
        "../images/profile/pf_5.svg",
      ],
    },
    {
      id: 2,
      title: "집중 50분, 10분 휴식 지키기",
      icon: "🧘🏻",
      color: "#F0CA4D",
      count: 8888,
      users: [
        "../images/profile/pf_1.svg",
        "../images/profile/pf_2.svg",
        "../images/profile/pf_3.svg",
        "../images/profile/pf_4.svg",
        "../images/profile/pf_5.svg",
      ],
    },
    {
      id: 3,
      title: "하루 2L 물마시기",
      icon: "💧",
      color: "#78B0FA",
      count: 4,
      users: [
        "../images/profile/pf_1.svg",
        "../images/profile/pf_2.svg",
        "../images/profile/pf_3.svg",
        "../images/profile/pf_4.svg",
      ],
    },
    {
      id: 4,
      title: "12가지 인생의 법칙!",
      icon: "❗️",
      color: "#FF8C80",
      count: 32,
      users: [
        "../images/profile/pf_1.svg",
        "../images/profile/pf_2.svg",
        "../images/profile/pf_3.svg",
        "../images/profile/pf_4.svg",
        "../images/profile/pf_5.svg",
      ],
    },
    {
      id: 6,
      title: "자전거 같이 타요~!",
      icon: "🚲",
      color: "#AD8CFA",
      count: 8,
      users: [
        "../images/profile/pf_1.svg",
        "../images/profile/pf_2.svg",
        "../images/profile/pf_3.svg",
      ],
    },
  ];

  return (
    <CardList isAtHome={isAtHome}>
      {dummy.map((el) => (
        <CardItem key={el.id} color={el.color}>
          <Card info={el} />
        </CardItem>
      ))}
    </CardList>
  );
};
Cards.defaultProps = {
  isAtHome: true,
};

Cards.propTypes = {
  isAtHome: PropTypes.bool,
};

export default Cards;
