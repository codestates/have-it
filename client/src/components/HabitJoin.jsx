import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Emoji } from "emoji-mart";
import DatePicker from "react-datepicker";
import { habitJoinProceedAction } from "../store/actions";
import "react-datepicker/dist/react-datepicker.css";

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

const HabitJoin = () => {
  const { id, title, emojiId, color } = useSelector(({ habitJoinReducer }) => habitJoinReducer);
  const [startDate, setStartDate] = useState(new Date());

  // TODO: 아래 코드는 나중에 삭제되어야 함
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      habitJoinProceedAction({
        id: 1,
        title: "집중 50분, 10분 휴식 지키기",
        emojiId: "grinning",
        color: "#46DBA0",
      })
    );
  }, [dispatch]);
  // ---

  return id ? (
    <Form>
      <h1>해빗 참여</h1>
      <EmojiTitleContainer>
        <EmojiContainer selectColor={color}>
          <Emoji emoji={emojiId} size={24} />
        </EmojiContainer>
        <Title>{title}</Title>
      </EmojiTitleContainer>
      <h1>{`${id}${title}${emojiId}${color}`}</h1>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    </Form>
  ) : (
    ""
  );
};

export default HabitJoin;
