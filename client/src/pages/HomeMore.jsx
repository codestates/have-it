import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ReactRouterPropTypes from "react-router-prop-types";
import Cards from "../components/Cards";
import SortButton from "../components/SortButton";
import habitsApi from "../api/habits";
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

const HomeMore = ({ match }) => {
  const dispatch = useDispatch();
  const { isPopup } = useSelector(({ homeReducer }) => homeReducer);

  const [habitsByCategory, setHabitsByCategory] = useState([]);
  const [sortName, setSortName] = useState("sortByUserCount");

  useEffect(() => {
    const getHabitsByCategory = async () => {
      const res = await habitsApi.findHabits(enTitle, 10, sortName);
      setHabitsByCategory(res.data.data);
    };
    getHabitsByCategory();
  }, [sortName]);

  const handlePopupClose = () => {
    dispatch(hidePopupAction);
  };

  const handleSortClick = (sort) => {
    setSortName(sort);
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
      <SortButton handleSortClick={handleSortClick} />
      <Container />
      <MoreCards habits={habitsByCategory} />
    </Main>
  );
};

HomeMore.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default HomeMore;
