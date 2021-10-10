import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { modalOffAction } from "../store/actions";
import "../styles/fontello/css/fontello.css";

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
  background-color: rgba(17, 26, 61, 0.5);
  padding: 3rem;
  z-index: 10;
`;

const Wrapper = styled.div`
  position: relative;
  padding: 2rem;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 20px;
`;

const CloseBtn = styled.button`
  font-size: 1.2rem;
  color: var(--color-black);
`;

const ChildrenWrapper = styled.div``;

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      dispatch(modalOffAction);
    }
  };
  const handleCloseClick = () => {
    dispatch(modalOffAction);
  };
  return (
    <Container onClick={handleBackgroundClick}>
      <Wrapper>
        <CloseBtn type="button" onClick={handleCloseClick}>
          <i className="icon-cancel" />
        </CloseBtn>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Wrapper>
    </Container>
  );
};

Modal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.element])).isRequired,
};

export default Modal;
