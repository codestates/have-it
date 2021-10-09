import React, { useState } from "react";
import styled, { css } from "styled-components";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import CategoryList from "./CategoryList";

const Form = styled.form`
  width: 48rem;
`;

const CategoryColorPickerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const EmojiPicker = styled.button`
  width: 3rem;
  height: 3rem;
  border: 1px solid ${({ selectColor }) => selectColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlusIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ selectColor }) => selectColor};
`;

const Emoji = styled.span`
  font-size: 1.5rem;
`;

const EmojiPickerContainer = styled.div`
  position: relative;
  margin-right: 1rem;
`;

const pickerStyle = {
  position: "absolute",
  top: "3.5rem",
  left: "0",
};

const ColorList = styled.div`
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  visibility: ${({ isColorPicker }) => (isColorPicker ? "visible" : "hidden")};
  opacity: ${({ isColorPicker }) => (isColorPicker ? "100%" : "0%")};
  transition: all 0.3s ease-out;
`;

const Color = styled.button`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-left: 0.2rem;
  ${({ color, selected }) =>
    selected &&
    css`
      border: 7px solid ${color};
      background-color: var(--color-white);
    `};
`;

const ColorPicker = styled(Color)`
  width: 1.8rem;
  height: 1.8rem;
`;

const ColorPickerContainer = styled.div`
  display: flex;
`;

const TitleInput = styled.input`
  flex: 1;
  /* border-bottom: 1px solid ${({ selectColor }) => selectColor}; */
  border-bottom: 1px solid var(--color-gray);
  padding: 0.5rem;
`;

const DescriptionInput = styled.textarea`
  /* border: 1px solid ${({ selectColor }) => selectColor}; */
  border: 1px solid var(--color-gray);
  width: 100%;
  padding: 1rem;
  resize: none;
  height: 10rem;
  border-radius: 1rem;
`;

const EmojiTitleContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const SubmitButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  font-family: Interop-SemiBold;
  font-size: 1.2rem;
  background-color: ${({ selectColor }) => selectColor};
  padding: 1rem;
  text-align: right;
  border-radius: 1rem;
  color: var(--color-white);
`;

const HabitCreate = () => {
  const [isEmojiPicker, setIsEmojiPicker] = useState(false);
  const [isColorPicker, setIsColorPicker] = useState(false);
  const [selectEmoji, setSelectEmoji] = useState(null);
  const [selectCategory, setSelectCategory] = useState(null);
  const [selectColor, setSelectColor] = useState("#78B0FA");
  const [inputValue, setInputValue] = useState({ title: "", description: "" });
  const colors = ["#FF80B3", "#FF8C80", "#F0CA4D", "#46DBA0", "#78B0FA", "#AD8CFA"];

  console.log(selectCategory);
  // const handleSubmit = () => {
  // TODO: 요청보내기
  // }
  const handlePickerSelect = (emoji) => {
    setIsEmojiPicker(false);
    setSelectEmoji(emoji);
  };
  const handleEmojiPickerClick = () => {
    setIsEmojiPicker(true);
  };
  const handleCategoryClick = (category) => {
    setSelectCategory(category);
  };
  const handleColorPickerClick = () => {
    setIsColorPicker(true);
  };
  const handleColorClick = (color) => {
    setIsColorPicker(false);
    setSelectColor(color);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleMouseEnter = () => {
    if (!isColorPicker) {
      setIsColorPicker(true);
    }
  };
  return (
    <Form>
      <h1>해빗 생성</h1>
      <CategoryColorPickerContainer>
        <CategoryList handleCategoryClick={handleCategoryClick} selectColor={selectColor} />
        <ColorPickerContainer>
          <ColorList isColorPicker={isColorPicker}>
            {colors.map((color) => (
              <Color
                key={color}
                type="button"
                color={color}
                selected={color === selectColor}
                onClick={() => handleColorClick(color)}
              />
            ))}
          </ColorList>
          <ColorPicker
            type="button"
            color={selectColor}
            onClick={handleColorPickerClick}
            onMouseEnter={handleMouseEnter}
          />
        </ColorPickerContainer>
      </CategoryColorPickerContainer>
      <EmojiTitleContainer>
        <EmojiPickerContainer>
          <EmojiPicker type="button" onClick={handleEmojiPickerClick} selectColor={selectColor}>
            {selectEmoji ? (
              <Emoji>{selectEmoji.native}</Emoji>
            ) : (
              <PlusIcon className="icon-plus" selectColor={selectColor} />
            )}
          </EmojiPicker>
          {isEmojiPicker && (
            <Picker
              set="apple"
              onSelect={handlePickerSelect}
              title="Pick your emoji…"
              emoji="point_up"
              style={pickerStyle}
            />
          )}
        </EmojiPickerContainer>
        <TitleInput
          placeholder="Title"
          type="text"
          value={inputValue.title}
          name="title"
          onChange={handleInputChange}
          selectColor={selectColor}
        />
      </EmojiTitleContainer>
      <DescriptionInput
        placeholder="Description"
        type="text"
        value={inputValue.description}
        name="description"
        onChange={handleInputChange}
        selectColor={selectColor}
      />
      <SubmitButtonContainer>
        <SubmitButton selectColor={selectColor}>만들기</SubmitButton>
      </SubmitButtonContainer>
    </Form>
  );
};

export default HabitCreate;
