/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { modalOffAction } from "../store/actions";

const Container = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 3rem;
`;

const Wrapper = styled.div`
  position: relative;
  padding: 1rem;
  background-color: white;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const handleClick = (event) => {
    if (event.target === event.currentTarget) {
      dispatch(modalOffAction);
    }
  };
  return (
    <Container onClick={handleClick}>
      <Wrapper>
        <CloseBtn>hi</CloseBtn>
        {children}
      </Wrapper>
    </Container>
  );
};

export default Modal;
