import React from "react";
import styled from "styled-components";
import Card from "./Card";

const CardList = styled.div`
  margin: 40px;
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

const Cards = () => {
  const dummy = [
    { id: 1, title: "달리기", icon: "🏃🏻", color: "#46DBA0", count: 5 },
    {
      id: 2,
      title: "집중 50분, 10분 휴식 지키기",
      icon: "🧘🏻",
      color: "#F0CA4D",
      count: 1072,
    },
    { id: 3, title: "하루 2L 물마시기", icon: "💧", color: "#78B0FA", count: 4 },
    { id: 4, title: "12가지 인생의 법칙!", icon: "❗️", color: "#FF8C80", count: 32 },
  ];

  // const colors = ["#FF80B3", "#FF8C80", "#F0CA4D", "#46DBA0", "#78B0FA", "#AD8CFA"];

  return (
    <>
      <CardList>
        {dummy.map((el) => (
          <CardItem key={el.id} color={el.color}>
            <Card info={el} />
          </CardItem>
        ))}
      </CardList>
    </>
  );
};

// prop types 해줘야 함

export default Cards;
