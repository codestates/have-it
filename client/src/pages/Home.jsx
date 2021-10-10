import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Cards from "../components/Cards";
import CategoryList from "../components/CategoryList";
import { hidePopupAction } from "../store/actions";

const Main = styled.div`
  overflow: scroll;
  height: calc(100vh - 96px);
`;

const Popup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-lightblue--02);
  border-radius: 10px;
  width: auto;
  height: 48px;
  margin: 5px 40px;
  padding: 0rem 1rem;
  margin: 1.5rem 2.5rem 0rem 2.5rem;
`;

const Title = styled.div`
  color: var(--color-black);
  margin: 32px 40px -20px 40px;
  font-size: 24px;
`;

const CategoryListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 64px 40px -16px 40px;
`;

const ViewMore = styled.button`
  font-size: 20px;
  color: var(--color-mainblue);
  height: 20px;
`;

const HidePopup = styled.div`
  font-size: "16px";
  color: var(--color-mainblue);
`;

// const HomeCategoryList = styled(CategoryList)`
//   button {
//     font-size: 100px !important;
//   }
// `;

const Home = () => {
  const { isPopup } = useSelector(({ homeReducer }) => homeReducer);
  const [selectCategory, setSelectCategory] = useState(1);
  const dispatch = useDispatch();
  const handlePopupClose = () => {
    dispatch(hidePopupAction);
  };

  const handleCategoryClick = useCallback(
    (category) => {
      setSelectCategory(category);
    },
    [setSelectCategory]
  );

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

      <>
        <Title>지금 뜨는 채널</Title>
        <Cards />
        <CategoryListContainer>
          <CategoryList isAtHome handleCategoryClick={handleCategoryClick} />
          <Link to={selectCategory.name_en ? `/more/${selectCategory.name_en}` : "/more"}>
            <ViewMore>
              더보기
              <i className="icon-right-open" style={{ fontSize: "20px", color: "#4D4DFF" }} />
            </ViewMore>
          </Link>
        </CategoryListContainer>
        <Cards />
      </>
    </Main>
  );
};

export default Home;
