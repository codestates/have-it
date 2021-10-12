import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 24px 0px 24px 40px;
  position: absolute;
  z-index: 1;
  background-color: var(--color-white);
  border-radius: 5px;
`;

const SortButton = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 5.5rem;
  height: 2rem;
  padding-left: 0.55rem;
  padding-right: 0.2rem;
  border: 2px solid var(--color-mainblue);
  color: var(--color-mainblue);
  font-size: 12px;
  font-weight: var(--fontWeight-semibold);
  cursor: pointer;
  :hover {
    background-color: var(--color-lightblue--02);
  }
  :nth-of-type(1) {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-right-radius: ${(props) => !props.isClicked && "5px"};
    border-bottom-left-radius: ${(props) => !props.isClicked && "5px"};
    border-bottom: ${(props) => props.isClicked && "none"};
  }
  :nth-of-type(2) {
    border-bottom: ${(props) => props.isClicked && "none"};
    border-top: ${(props) => !props.isClicked && "none"};
  }
  :nth-of-type(3) {
    border-bottom: ${(props) => props.isClicked && "none"};
    border-top: ${(props) => props.isClicked && "none"};
  }
  :nth-of-type(4) {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top: ${(props) => props.isClicked && "none"};
  }
`;

const Sort = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [select, setSelect] = useState(1);
  const [options, setOptions] = useState([
    { id: 0, sortBy: "인기순" },
    { id: 1, sortBy: "인기순" },
    { id: 2, sortBy: "최신순" },
    { id: 3, sortBy: "사용자순" },
  ]);

  const handleSelect = (index) => {
    setSelect(index);
    setIsClicked(false);
    const newOptions = options.slice();
    newOptions[0].sortBy = options[index].sortBy;
    setOptions(newOptions);
  };

  const handleClick = () => {
    setIsClicked(true);
  };
  return (
    <Container>
      {isClicked ? (
        options.map((option, index) =>
          index === 0 ? (
            <SortButton key={option.id} onClick={() => handleSelect(index)} isClicked={isClicked}>
              {option.sortBy}
              <i className="icon-up-open" style={{ fontSize: "20px", color: "#4D4DFF" }} />
            </SortButton>
          ) : (
            (() =>
              index === select ? (
                <SortButton
                  key={option.id}
                  onClick={() => handleSelect(index)}
                  isClicked={isClicked}
                >
                  {option.sortBy}
                  <i className="icon-check" style={{ fontSize: "17px", color: "#4D4DFF" }} />
                </SortButton>
              ) : (
                <SortButton
                  key={option.id}
                  onClick={() => handleSelect(index)}
                  isClicked={isClicked}
                >
                  {option.sortBy}
                </SortButton>
              ))()
          )
        )
      ) : (
        <SortButton key={options[select].id} onClick={handleClick} isClicked={isClicked}>
          {options[select].sortBy}{" "}
          <i className="icon-down-open" style={{ fontSize: "20px", color: "#4D4DFF" }} />
        </SortButton>
      )}
    </Container>
  );
};

export default Sort;
