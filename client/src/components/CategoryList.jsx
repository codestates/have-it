import React, { useState, memo, useEffect } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import categoriesApi from "../api/categories";

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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategoriesDataAndSet = async () => {
      const { data } = await categoriesApi.getCategories();
      setCategories(data.categories);
    };
    getCategoriesDataAndSet();
  }, []);

  return (
    <>
      {categories && categories.length > 0 && (
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
              {category.title}
            </Category>
          ))}
        </Container>
      )}
    </>
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
