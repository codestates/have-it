import React, { useState, memo } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
`;

const Category = styled.button`
  font-family: Interop-Bold;
  padding: 0.4rem 0.8rem;
  margin-right: 0.5rem;
  color: var(--color-gray);
  border: 1px solid var(--color-gray);
  border-radius: 1.5rem;
  font-size: ${(props) => props.isAtHome && "24px"};
  opacity: 0.6;
  ${({ selected, selectColor }) =>
    selected &&
    css`
      border-color: ${selectColor};
      color: ${selectColor};
      opacity: 1;
    `}
`;

const CategoryList = memo(({ handleCategoryClick, selectColor, isAtHome }) => {
  const [selectCategoryId, setSelectCategoryId] = useState(isAtHome ? 1 : null);

  // TODO: categories를 서버에서 받아오기
  const categories = [
    { id: 1, name: "💪🏻 운동", name_en: "exercise" },
    { id: 2, name: "📚 독서", name_en: "book" },
    { id: 3, name: "✏️ 공부", name_en: "study" },
    { id: 4, name: "💖 마음", name_en: "mind" },
    { id: 5, name: "⏰ 생활 습관", name_en: "routine" },
  ];

  return (
    <Container>
      {categories.map((category) => (
        <Category
          key={category.id}
          type="button"
          selected={category.id === selectCategoryId}
          selectColor={selectColor}
          onClick={() => {
            setSelectCategoryId(category.id);
            handleCategoryClick(category);
          }}
          isAtHome
        >
          {category.name}
        </Category>
      ))}
    </Container>
  );
});

CategoryList.propTypes = {
  handleCategoryClick: PropTypes.func.isRequired,
  selectColor: PropTypes.string,
  isAtHome: PropTypes.bool.isRequired,
};

CategoryList.defaultProps = {
  selectColor: "#4D4DFF",
};

export default CategoryList;
