import React from "react";
import styled from "styled-components";
import Post from "../components/Post";

const HabitContainer = styled.div`
  width: 100%;
  height: calc(100vh - 6rem);
  display: flex;
  padding: 40px 60px;

  > * {
    ::-webkit-scrollbar {
      display: none;
    }
  }

  > *:last-of-type {
    overflow-y: scroll;
  }
`;

const InfoContainer = styled.div`
  flex: 0 0 400px;
  display: flex;
  flex-direction: column;
`;

const HabitInfo = styled.div`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Category = styled.div`
  font-family: Interop-Bold;
  font-size: 1.125rem;
  padding: 0.4rem 0.8rem;
  color: var(--color-mainblue);
  border: 1px solid var(--color-mainblue);
  border-radius: 1.5rem;
  background-color: var(--color-white);
`;

const CoverContainer = styled.div`
  margin: 1rem 0 2rem;
  width: 100%;
  height: fit-content;
  position: relative;
`;

const Image = styled.div`
  width: 100%;
  height: 0;
  padding-top: 60%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  /* border: 1px solid ${(props) => props.color}; */
  border-radius: 10px;
`;

const EmojiContainer = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 4.5rem;
  position: absolute;
  bottom: -1rem;
  right: -1rem;
  background-color: var(--color-white);
  filter: drop-shadow(0 0 6px var(--color-shadow));
`;

const Emoji = styled.div`
  font-size: 2.5rem;
  line-height: 4.5rem;
  text-align: center;
  background-color: ${(props) => props.color}80;
  border: 1px solid ${(props) => props.color};
  border-radius: inherit;
`;

const Description = styled.div`
  width: 100%;
  line-height: var(--lineHeight-relaxed);
`;

const UserGoalInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Interop-SemiBold;
  * {
    font-family: inherit;
  }
`;

const GoalTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

const GoalTitle = styled.h2`
  font-size: 1.375rem;
`;

const EditButton = styled.button`
  font-family: Interop-Medium;
  margin-top: 0.2rem;
  font-size: 1rem;
  color: var(--color-midgray);
  display: flex;
  align-items: baseline;

  :hover {
    color: var(--color-gray);
  }

  > div {
    font-size: 1.125rem;
  }
`;

const GoalContentContainer = styled.div`
  width: 100%;
  background-color: var(--color-lightblue--02);
  border: 1px solid var(--color-mainblue);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const GoalSubtitle = styled.h3`
  color: var(--color-mainblue);
  font-size: 1rem;
  margin: 1.6rem 0 0.8rem;

  :first-of-type {
    margin-top: 0;
  }
`;

const GoalContent = styled.p`
  font-size: 1.25rem;
`;

const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 1rem;
  border: 1px solid var(--color-mainblue);
  border-radius: 0.6rem;
`;

const TargetBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: ${(props) => props.rate * 100}%;
  height: 100%;
  background-color: var(--color-lightblue);
  border-radius: 0.6rem 0 0 0.6rem;
`;

const ActualBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: ${(props) => props.rate * 100}%;
  height: 100%;
  background-color: var(--color-mainblue);
  border-radius: 0.6rem 0 0 0.6rem;
`;

const RateTextContainer = styled.div`
  width: 100%;
  height: 1.4rem;
  position: relative;
`;

const RateText = styled.span`
  margin-top: 0.4rem;
  position: absolute;
  top: 0;
  left: ${(props) => props.rate * 100}%;
  font-size: 0.875rem;
  color: var(--color-mainblue);
`;

const Divider = styled.div`
  flex: 0 0 1;
  margin: 0 60px;
  width: 1px;
  height: 100%;
  border-radius: 1px;
  background-color: var(--color-midgray);
`;

const Feed = styled.div`
  flex: 0 0 1;
  width: 100%;
`;

const Habit = () => {
  const habit = {
    image:
      "https://media.istockphoto.com/photos/female-hand-giving-thumbs-up-picture-id627216922?k=20&m=627216922&s=612x612&w=0&h=CzSWk_kGugXM7oWDOyxPv_yvBsWxykXZ1LwN9oS33rI=",
    title: "칭찬합시다~!🐳",
    desc: "칭찬은 평범한 사람을 특별한 사람으로 만드는 ⭐마법의 문장⭐입니다. 스스로를 위해, 주변을 위해 칭찬하는 습관을 길러보는건 어떨까요?👏💖",
    category: "💖 마음",
    user_count: 127,
    emoji_id: "😌",
    color: "#F0CA4D",
    creator_id: 1,
  };

  const user = { id: 2, username: "leezy_kim" };

  const userHabit = {
    goal: "💎 자기 전 하루를 돌아보며 칭찬 일기 쓰기 💎",
    actual_amount_percent: 0.435,
    target_amount_percent: 0.707,
  };

  return (
    <HabitContainer>
      <InfoContainer>
        <HabitInfo>
          <CategoryContainer>
            <Category>{habit.category}</Category>
            <EditButton className="icon-pencil">
              <div>수정</div>
            </EditButton>
          </CategoryContainer>
          <CoverContainer>
            <Image src={habit.image} color={habit.color} />
            <EmojiContainer>
              <Emoji color={habit.color}>{habit.emoji_id}</Emoji>
            </EmojiContainer>
          </CoverContainer>
          <Description>{habit.desc}</Description>
        </HabitInfo>
        <UserGoalInfo>
          <GoalTitleContainer>
            <GoalTitle>{user.username}님의 해빗</GoalTitle>
            <EditButton className="icon-pencil">
              <div>수정</div>
            </EditButton>
          </GoalTitleContainer>
          <GoalContentContainer>
            <GoalSubtitle>하루 목표</GoalSubtitle>
            <GoalContent>{userHabit.goal}</GoalContent>
            <GoalSubtitle>달성율</GoalSubtitle>
            <ProgressBar>
              <TargetBar rate={userHabit.target_amount_percent} />
              <ActualBar rate={userHabit.actual_amount_percent} />
            </ProgressBar>
            <RateTextContainer>
              <RateText rate={userHabit.target_amount_percent}>
                {userHabit.target_amount_percent * 100}%
              </RateText>
              <RateText rate={userHabit.actual_amount_percent}>
                {userHabit.actual_amount_percent * 100}%
              </RateText>
            </RateTextContainer>
          </GoalContentContainer>
        </UserGoalInfo>
      </InfoContainer>
      <Divider />
      <Feed>
        <Post />
      </Feed>
    </HabitContainer>
  );
};

export default Habit;
