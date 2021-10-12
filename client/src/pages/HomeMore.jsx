import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Cards from "../components/Cards";
import SortButton from "../components/SortButton";
import { hidePopupAction } from "../store/actions";

const Main = styled.div`
  overflow: scroll;
  max-height: calc(100vh - 6rem);
`;

const Popup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-lightblue--02);
  border-radius: 10px;
  min-height: 3rem;
  margin: 0.5rem 2.5rem;
  padding: 0rem 1rem;
  margin: 1.5rem 2.5rem 0rem 2.5rem;
`;

const HidePopup = styled.button`
  background: none;
  font-size: 1rem;
  color: var(--color-mainblue);
`;

const Container = styled.div`
  width: calc(100vw - 5rem);
  height: 2.5rem;
`;

const MoreCards = styled(Cards)`
  margin: 5rem;
`;

const HomeMore = () => {
  const { isPopup } = useSelector(({ homeReducer }) => homeReducer);
  const dispatch = useDispatch();
  const handlePopupClose = () => {
    dispatch(hidePopupAction);
  };

  return (
    <Main>
      {isPopup && (
        <Popup>
          <>📣 카드를 클릭하면 채널에 참여할 수 있어요. 마음에 드는 채널을 골라 참여해보세요!</>
          <HidePopup onClick={handlePopupClose}>
            <i className="icon-cancel" />
          </HidePopup>
        </Popup>
      )}
      <SortButton />
      <Container />
      <MoreCards />
    </Main>
  );
};

export default HomeMore;
