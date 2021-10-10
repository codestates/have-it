import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Emoji } from "emoji-mart";
import { habitJoinProceedAction } from "../store/actions";

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

const Title = styled.div`
  flex: 1;
`;

const HabitJoin = () => {
  const { id, title, emojiId, color } = useSelector(({ habitJoinReducer }) => habitJoinReducer);

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
    </Form>
  ) : (
    ""
  );
};

export default HabitJoin;
