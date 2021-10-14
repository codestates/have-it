import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { Emoji } from "emoji-mart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = styled.form`
  width: 48rem;
  h1,
  h3 {
    margin-top: 1.5rem;
    margin-bottom: 0.7rem;
  }
`;

const EmojiTitleContainer = styled.div`
  display: flex;
`;

const EmojiContainer = styled.div`
  width: 3rem;
  height: 3rem;
  border: 1px solid ${({ selectColor }) => selectColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

const Title = styled.span`
  /* border-radius: 0.25rem; */
  flex: 1;
  font-size: 1.2rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-gray);
`;

const DescriptionInput = styled.textarea`
  border-radius: 0.25rem;
  border: 1px solid var(--color-gray);
  width: 100%;
  padding: 1rem;
  resize: none;
  height: 3rem;
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
  background-color: var(--color-mainblue);
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
const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const StartDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  font-size: 1rem;
  color: var(--color-gray);
  div {
    margin-bottom: 4px;
  }
`;
const EndDate = styled(StartDate)``;
const Day = styled(StartDate)``;

const StyledDate = styled.div`
  margin-top: 10px;
  .react-datepicker {
    width: 100%;
    /* height: 476px; */
    background: var(--color-white);
    .react-datepicker__header {
      background: none;
      border: none;
      font-size: 25px;
      .react-datepicker__current-month {
        color: var(--color-black);
        font-weight: 300;
        font-size: 1.2rem;
      }
      .react-datepicker__day-names {
        margin-top: 1.5rem;
        > * {
          color: var(--color-black);
          width: auto;
          margin: 0 0.52rem;
          font-size: 0.8rem;
        }
      }
    }
    .react-datepicker__month-container {
      width: 100%;
      height: 100%;
      padding: 0.6rem 0;
      .react-datepicker__day {
        color: var(--color-gray);
        font-size: 0.8rem;
        width: 2rem;
        line-height: 1.6rem;
        margin: 0;
        border-radius: 0;
      }
    }
    .react-datepicker__navigation--previous {
      left: 10%;
      top: 2rem;
      border: none;
      background: url() no-repeat right center;
      color: var(--color-mainblue) !important;
      width: 20px;
      height: 20px;
      outline: none;
    }
    .react-datepicker__navigation--next {
      right: 10%;
      top: 2rem;
      border: none;
      background: url() no-repeat left center;
      color: var(--color-mainblue) !important;
      width: 20px;
      height: 20px;
      outline: none;
    }
    .react-datepicker__day--selected {
      color: #a9d3ab !important;
      border-radius: 0 !important;
      background-color: var(--color-mainblue) !important;
      border: 2px solid #a9d3ab !important;
    }
    .react-datepicker__day--in-range {
      background: #132c14 !important;
      border-top: 2px solid #a9d3ab !important;
      border-bottom: 2px solid #a9d3ab !important;
      color: #a9d3ab !important;
    }
    .react-datepicker__day--in-selecting-rage {
      border-radius: 0 !important;
    }
    .react-datepicker .react-datepicker__month-container .react-datepicker__day {
      color: #7a7585;
      font-size: 1.34rem;
      width: 3.7rem;
      line-height: 3.3rem;
      margin: 0;
      border-radius: 0;
    }
    .react-datepicker .react-datepicker__day--selected,
    .react-datepicker__day--range-end {
      color: var(--color-white) !important;
      border-radius: 0 !important;
      background-color: var(--color-mainblue) !important;
      outline: none;
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--in-selecting-range,
    .react-datepicker__day--in-range,
    .react-datepicker__month-text--selected,
    .react-datepicker__month-text--in-selecting-range,
    .react-datepicker__month-text--in-range,
    .react-datepicker__quarter-text--selected,
    .react-datepicker__quarter-text--in-selecting-range,
    .react-datepicker__quarter-text--in-range,
    .react-datepicker__year-text--selected,
    .react-datepicker__year-text--in-selecting-range,
    .react-datepicker__year-text--in-range {
      color: var(--color-white) !important;
      border: 1px solid var(--color-mainblue) !important;
    }
    .react-datepicker__day-highlighted-start-date.react-datepicker__day-highlighted-end-date {
      border-radius: 10px !important;
      border: 2px solid #a9d3ab !important;
    }
    .react-datepicker__day-highlighted-start-date {
      border-radius: 10px 0 0 10px !important;
      border-top: 2px solid #a9d3ab !important;
      border-left: 2px solid #a9d3ab !important;
      border-bottom: 2px solid #a9d3ab !important;
      border-right: none !important;
    }
    .react-datepicker__day-highlighted-end-date {
      border-radius: 0 10px 10px 0 !important;
      border-top: 2px solid #a9d3ab !important;
      border-right: 2px solid #a9d3ab !important;
      border-bottom: 2px solid #a9d3ab !important;
      border-left: none !important;
    }
    .react-datepicker__day--today {
      position: relative;
      &:after {
        content: "Today";
        position: absolute;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
        color: var(--color-lightblue);
        font-size: 0.6rem;
      }
      &.react-datepicker__day-highlighted-start-date {
        border-radius: 10px 0 0 10px !important;
        border-top: 2px solid #a9d3ab !important;
        border-left: 2px solid #a9d3ab !important;
        border-bottom: 2px solid #a9d3ab !important;
        border-right: none !important;
        &.react-datepicker__day-highlighted-end-date {
          border-radius: 10px !important;
          border: 2px solid #a9d3ab !important;
        }
      }
    }
  }
`;

const StyledDatePicker = styled(DatePicker)`
  font-family: Interop-Bold;
  padding: 0.65rem;
  border-radius: 2rem;
  margin-right: 0.5rem;
  color: var(--color-gray);
  border: 1px solid var(--color-gray);
  font-size: 1rem;
  width: 80%;
  text-align: center;
`;

const Color = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--color-white);
  color: var(--color-mainblue);
  border: 1px solid var(--color-lightblue);
  margin-left: 0.2rem;
  ${({ selected }) =>
    selected &&
    css`
      color: var(--color-white);
      background-color: var(--color-mainblue);
    `};
`;

const ColorPickerContainer = styled.div`
  display: flex;
`;

const HabitJoin = () => {
  const { habitsId, title, emojiId, color } = useSelector(
    ({ habitJoinReducer }) => habitJoinReducer
  );
  const [startDate, setStartDate] = useState(new Date());
  const [selectColor, setSelectColor] = useState("");
  const [message, setMessage] = useState(null);
  const [inputValue, setInputValue] = useState({ title: "", description: "" });
  const colors = ["#FF80B3", "#FF8C80", "#F0CA4D", "#46DBA0", "#78B0FA", "#31307e", "#AD8CFA"];
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleMessageCloseClick = () => {
    setMessage(null);
    setSelectColor("#78B0FA");
  };

  const handleColorClick = (arg) => {
    // setIsColorPicker(false);
    setSelectColor(arg);
  };

  return habitsId ? (
    <Form>
      <h1>해빗 참여</h1>
      <EmojiTitleContainer>
        <EmojiContainer selectColor={color}>
          <Emoji emoji={emojiId} size={24} />
        </EmojiContainer>
        <Title>{title}</Title>
      </EmojiTitleContainer>
      <h3>참여 기간</h3>
      <DateContainer>
        <StartDate>
          <div>시작</div>
          <StyledDate>
            <StyledDatePicker
              dateFormat="yyyy/MM/dd"
              showPopperArrow={false}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </StyledDate>
        </StartDate>
        <EndDate>
          <div>종료</div>
          <StyledDate>
            <StyledDatePicker
              dateFormat="yyyy/MM/dd"
              showPopperArrow={false}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </StyledDate>
        </EndDate>
        <Day>
          <div>요일 설정</div>
          <ColorPickerContainer>
            {colors.map((el, index) => (
              <Color
                key={el}
                type="button"
                color={el}
                selected={el === selectColor}
                onClick={() => handleColorClick(el)}
              >
                {days[index]}
              </Color>
            ))}
          </ColorPickerContainer>
        </Day>
      </DateContainer>
      <h3>나만의 구체적인 목표</h3>
      <DescriptionInput
        placeholder="Your Goal"
        type="text"
        value={inputValue.description}
        name="description"
        onChange={handleInputChange}
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
        <SubmitButton selectColor={selectColor}>참여하기</SubmitButton>
      </MessageSubmitButtonContainer>
    </Form>
  ) : (
    ""
  );
};

export default HabitJoin;
