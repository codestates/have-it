import React, { useState, memo } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
`;

const Category = styled.button`
  padding: 0.2rem 0.7rem;
  margin-right: 0.5rem;
  color: var(--color-gray);
  border: 1px solid var(--color-gray);
  border-radius: 1.5rem;
  ${({ selected, selectColor }) =>
    selected &&
    css`
      font-family: Interop-SemiBold;
      border-color: ${selectColor};
      color: ${selectColor};
    `}
`;

const CategoryList = memo(({ handleCategoryClick, selectColor }) => {
  const [selectCategoryId, setSelectCategoryId] = useState(null);

  // TODO: categories를 서버에서 받아오기
  const categories = [
    { id: 1, name: "💪🏻 운동" },
    { id: 2, name: "📚 독서" },
    { id: 3, name: "✏️ 공부" },
    { id: 4, name: "💖 마음" },
    { id: 5, name: "⏰ 생활 습관" },
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
};

CategoryList.defaultProps = {
  selectColor: "#4D4DFF",
};

export default CategoryList;
