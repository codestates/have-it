import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import "emoji-mart/css/emoji-mart.css";
import { Picker, Emoji } from "emoji-mart";
import { useDispatch } from "react-redux";
import CategoryList from "./CategoryList";
import habitsApi from "../api/habits";
import { habitJoinModalOnAction, habitJoinProceedAction, modalOffAction } from "../store/actions";

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
  border-bottom: 1px solid var(--color-gray);
  padding: 0.5rem;
`;

const DescriptionInput = styled.textarea`
  border-radius: 0.25rem;
  border: 1px solid var(--color-gray);
  width: 100%;
  padding: 1rem;
  resize: none;
  height: 10rem;
`;

const EmojiTitleContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const MessageSubmitButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  height: 3rem;
`;

const MessageContainer = styled.div`
  border-radius: 0.25rem;
  padding: 1rem;
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
  color: var(--color-black);
`;

const Message = styled.span`
  flex: 1;
`;

const AttentionIcon = styled.div`
  margin-right: 0.2rem;
  color: #faad14;
`;

const SubmitButton = styled.button`
  border-radius: 0.25rem;
  font-family: Interop-SemiBold;
  height: 100%;
  padding: 0 1rem;
  font-size: 1.2rem;
  background-color: ${({ selectColor }) => selectColor};
  text-align: right;
  color: var(--color-white);
  margin-left: 1rem;
`;

const MessageCloseButton = styled.button``;

const CloseIcon = styled.div`
  ::before {
    margin: 0;
  }
`;

const HabitCreate = () => {
  const dispatch = useDispatch();

  const [isEmojiPicker, setIsEmojiPicker] = useState(false);
  const [isColorPicker, setIsColorPicker] = useState(false);
  const [selectEmojiId, setSelectEmojiId] = useState(null);
  const [selectCategory, setSelectCategory] = useState(null);
  const [selectColor, setSelectColor] = useState("#78B0FA");
  const [inputValue, setInputValue] = useState({ title: "", description: "" });
  const [message, setMessage] = useState(null);
  const colors = ["#FF80B3", "#FF8C80", "#F0CA4D", "#46DBA0", "#78B0FA", "#AD8CFA"];

  const handlePickerSelect = (emoji) => {
    setIsEmojiPicker(false);
    setSelectEmojiId(emoji.id);
  };
  const handleEmojiPickerClick = () => {
    setIsEmojiPicker(true);
  };
  const handleCategoryClick = useCallback(
    (category) => {
      setSelectCategory(category);
    },
    [setSelectCategory]
  );
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
  const handleMessageCloseClick = () => {
    setMessage(null);
  };
  const validate = (item, msg) => {
    if (!item) {
      setMessage(msg);
      return false;
    }
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !validate(selectCategory, "카테고리를 선택해주세요.") ||
      !validate(selectColor, "색상을 선택해주세요.") ||
      !validate(selectEmojiId, "이모지를 선택해주세요.") ||
      !validate(inputValue.title, "제목을 적어주세요.") ||
      !validate(inputValue.description, "설명을 적어주세요.")
    ) {
      return;
    }
    const res = await habitsApi.createHabit(
      selectCategory.id,
      selectColor,
      selectEmojiId,
      inputValue.title,
      inputValue.description
    );
    if (res.status === 201) {
      dispatch(habitJoinProceedAction(res.data.data));
      dispatch(modalOffAction);
      dispatch(habitJoinModalOnAction);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h1>해빗 생성</h1>
      <CategoryColorPickerContainer>
        <CategoryList
          handleCategoryClick={handleCategoryClick}
          selectColor={selectColor}
          isAtHome={false}
        />
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
            {selectEmojiId ? (
              <Emoji emoji={selectEmojiId} size={24} />
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
      <MessageSubmitButtonContainer>
        {message && (
          <MessageContainer>
            <AttentionIcon className="icon-attention-2" />
            <Message>{message}</Message>
            <MessageCloseButton type="button" onClick={handleMessageCloseClick}>
              <CloseIcon className="icon-cancel" />
            </MessageCloseButton>
          </MessageContainer>
        )}
        <SubmitButton selectColor={selectColor}>만들기</SubmitButton>
      </MessageSubmitButtonContainer>
    </Form>
  );
};

export default HabitCreate;
