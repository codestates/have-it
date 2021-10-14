import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { Emoji } from "emoji-mart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import habitsApi from "../api/habits";
import { modalOffAction, updateUserHabitAction } from "../store/actions";

const Form = styled.form`
  width: 48rem;
`;

const EmojiTitleContainer = styled.div`
  display: flex;
`;

const EmojiContainer = styled.div`
  width: 3rem;
  height: 3rem;
  border: 1px solid ${({ selectColor }) => selectColor};
  background-color: ${({ selectColor }) => selectColor};
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
`;

const GoalInput = styled.textarea`
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
const DateContainer = styled.div`
  display: flex;
`;

const StartDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  font-size: 1rem;
  color: var(--color-gray);
`;
const EndDate = styled(StartDate)``;
const SetDayContainer = styled(StartDate)``;

const StyledDate = styled.div`
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
  border-radius: 0.25rem;
  margin-right: 0.5rem;
  color: var(--color-gray);
  border: 1px solid var(--color-gray);
  font-size: 1rem;
  width: 80%;
  text-align: center;
`;

const StyledH1 = styled.h1`
  margin-top: 1.4rem;
  margin-bottom: 1rem;
`;
const StyledH3 = styled.h3`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;
const StyledH4 = styled.h4`
  margin-bottom: 0.5rem;
`;

const DaysContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const Day = styled.button`
  width: 2rem;
  height: 2rem;
  border: 1px solid ${({ selectColor }) => selectColor};
  margin-right: 0.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ selectColor }) => selectColor};
  transition: background-color 100ms ease-out;
  ${({ selected, selectColor }) =>
    selected &&
    css`
      background-color: ${selectColor};
      border-color: ${selectColor};
      color: var(--color-white);
    `}
`;

const getDay = (value) => {
  let tempValue = value;
  const week = { 월: 64, 화: 32, 수: 16, 목: 8, 금: 4, 토: 2, 일: 1 };
  if (Array.isArray(tempValue)) {
    return tempValue.reduce((acc, cur) => {
      if (!week[cur] || typeof acc === "string") {
        return "잘못된 요일입니다";
      }
      return acc + week[cur];
    }, 0);
  }
  const weekKey = Object.keys(week);
  const selectWeek = [];
  weekKey.forEach((el) => {
    const num = tempValue - week[el];
    if (num >= 0) {
      selectWeek.push(el);
      tempValue = num;
    }
  });
  if (tempValue !== 0) return "잘못된 숫자입니다";
  return selectWeek;
};

const HabitJoin = () => {
  const { habitsId, title, emojiId, color } = useSelector(
    ({ habitJoinReducer }) => habitJoinReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [goal, setGoal] = useState("");
  const [habitDayNumber, setHabitDayNumber] = useState(0);
  const [habitDayArray, setHabitDayArray] = useState([]);
  const [message, setMessage] = useState(null);
  const days = [
    { str: "월", num: 64 },
    { str: "화", num: 32 },
    { str: "수", num: 16 },
    { str: "목", num: 8 },
    { str: "금", num: 4 },
    { str: "토", num: 2 },
    { str: "일", num: 1 },
  ];

  useEffect(() => {
    const tempHabitDayArray = getDay(habitDayNumber);
    setHabitDayArray(tempHabitDayArray);
  }, [habitDayNumber]);

  const handleMessageCloseClick = () => {
    setMessage(null);
  };

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const handleDayClick = (selected, num) => {
    if (selected) {
      return setHabitDayNumber((prevNum) => prevNum - num);
    }
    return setHabitDayNumber((prevNum) => prevNum + num);
  };

  const validate = (item, msg) => {
    if (!item) {
      setMessage(msg);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !validate(goal, "목표를 작성해주세요.") ||
      !validate(habitDayNumber, "요일을 선택해주세요.")
    ) {
      return;
    }
    setMessage(null);
    const res = await habitsApi.joinHabit(habitsId, startDate, endDate, goal, habitDayNumber);
    if (res.status === 200) {
      dispatch(updateUserHabitAction(res.data.data));
      dispatch(modalOffAction);
      history.push(`/habit/${habitsId}`);
    }
  };

  return habitsId ? (
    <Form onSubmit={handleSubmit}>
      <StyledH1>해빗 참여</StyledH1>
      <EmojiTitleContainer>
        <EmojiContainer selectColor={color}>
          <Emoji emoji={emojiId} size={24} />
        </EmojiContainer>
        <Title>{title}</Title>
      </EmojiTitleContainer>
      <StyledH3>참여 기간</StyledH3>
      <DateContainer>
        <StartDate>
          <StyledH4>시작</StyledH4>
          <StyledDate>
            <StyledDatePicker
              dateFormat="yyyy/MM/dd"
              showPopperArrow={false}
              selected={startDate}
              onChange={(date) => {
                console.log(date);
                setStartDate(date);
              }}
            />
          </StyledDate>
        </StartDate>
        <EndDate>
          <StyledH4>종료</StyledH4>
          <StyledDate>
            <StyledDatePicker
              dateFormat="yyyy/MM/dd"
              showPopperArrow={false}
              selected={endDate}
              onChange={(date) => {
                let tempDate = date;
                if (tempDate < startDate) {
                  tempDate = startDate;
                }
                setEndDate(tempDate);
              }}
            />
          </StyledDate>
        </EndDate>
        <SetDayContainer>
          <StyledH4>요일 설정</StyledH4>
          <DaysContainer>
            {days.map((day) => {
              let selected = false;
              if (habitDayArray.find((ele) => ele === day.str)) {
                selected = true;
              }
              return (
                <Day
                  type="button"
                  selectColor={color}
                  selected={selected}
                  onClick={() => handleDayClick(selected, day.num)}
                >
                  {day.str}
                </Day>
              );
            })}
          </DaysContainer>
        </SetDayContainer>
      </DateContainer>
      <StyledH3>나만의 구체적인 목표</StyledH3>
      <GoalInput
        placeholder="Your Goal"
        type="text"
        value={goal}
        name="description"
        onChange={handleGoalChange}
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
        <SubmitButton type="submit" selectColor={color}>
          참여하기
        </SubmitButton>
      </MessageSubmitButtonContainer>
    </Form>
  ) : (
    ""
  );
};

export default HabitJoin;
