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
  background-color: var(--color-lightblue);
  max-width: 360px;
`;

export default function Cards() {
  return (
    <>
      <CardList>
        <CardItem>
          <Card />
        </CardItem>
        <CardItem>
          <Card />
        </CardItem>
        <CardItem>
          <Card />
        </CardItem>
        <CardItem>
          <Card />
        </CardItem>
        <CardItem>
          <Card />
        </CardItem>
        <CardItem>
          <Card />
        </CardItem>
        <CardItem>
          <Card />
        </CardItem>
      </CardList>
    </>
  );
}
