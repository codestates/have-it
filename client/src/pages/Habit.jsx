import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import uuid from "react-uuid";
import { Emoji } from "emoji-mart";
import authApi from "../api/auth";
import habitsApi from "../api/habits";
import { signInAction, signOutAction } from "../store/actions";
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

const EmojiBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color}80;
  border: 1px solid ${(props) => props.color};
  border-radius: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding: 0.325rem 0.4rem;
  border-radius: 6px;
  font-size: 1rem;
  color: var(--color-midgray);
  display: flex;
  align-items: baseline;

  :hover {
    color: var(--color-gray);
    background-color: var(--color-lightgray);
    opacity: 0.9;
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
  margin: 0.8em 0 0.4rem;

  :first-of-type {
    margin-top: 0;
  }
`;

const GoalContent = styled.p`
  font-size: 1.125rem;
  margin: 0.1rem 0;
`;

const ProgressBar = styled(Progress)`
  height: 1rem;
  font-size: 1.25rem;
  > div {
    height: calc(100% - 0.2rem);
    :first-of-type {
      overflow: hidden;
      margin-top: 0.125rem;
      background-color: var(--color-lightblue);
    }
  }
  * {
    height: 100%;
  }
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

const EmptyComponent = styled.div`
  border: 1px solid var(--color-mainblue);
  background-color: var(--color-lightblue--02);
  color: var(--color-mainblue);
  position: relative;
`;

const EmptyImage = styled(EmptyComponent)`
  width: 100%;
  height: 0;
  padding-top: 60%;
  border-radius: 10px;

  > * {
    width: 100%;
    position: absolute;
    top: calc(50% - 0.5rem);
    text-align: center;
  }
`;

const EmptyFeed = styled(EmptyComponent)`
  height: calc(100vh - 14.25rem - 80px);
  border-radius: 10px;
  margin: 0 6rem;

  > * {
    width: 100%;
    position: absolute;
    top: calc(50% - 0.5rem);
    text-align: center;
  }
`;

const Habit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [habits, setHabits] = useState({
    habitsId: null,
    userCount: null,
    title: "",
    description: "",
    image: null,
    emojiId: "",
    color: "",
    categoriesId: null,
    creatorId: "",
    Posts: [],
  });
  const [userHabits, setUserHabits] = useState({
    userhabitsId: null,
    goal: "",
    actualAmount: 0,
    targetAmount: 0,
  });
  const [posts, setPosts] = useState([]);
  const { nickname } = useSelector(({ authReducer }) => authReducer);

  useEffect(() => {
    const checkValidUser = async () => {
      const res = await authApi.me();
      if (res.status === 200) {
        dispatch(signInAction(res.data.data));
      } else if (res.status === 202) {
        dispatch(signOutAction);
        history.push("/");
      }
    };
    checkValidUser();
  }, [dispatch, history]);

  useEffect(() => {
    const getHabitInfo = async () => {
      const res = await habitsApi.findHabitById(id);
      if (res.status === 200) {
        setHabits(res.data.data.habits);
        setUserHabits(res.data.data.userInfo);
        setPosts(res.data.data.habits.posts.reverse());
      }
    };
    getHabitInfo();
  }, [id]);

  return (
    <HabitContainer>
      <InfoContainer>
        <HabitInfo>
          <CategoryContainer>
            <Category>{habits.categoryTitle}</Category>
            <EditButton className="icon-pencil">
              <div>수정</div>
            </EditButton>
          </CategoryContainer>
          <CoverContainer>
            {habits.image ? (
              <Image src={habits.image} color={habits.color} />
            ) : (
              <EmptyImage>
                <div>
                  대표 사진이 아직 없어요. 🤨
                  <br />
                </div>
              </EmptyImage>
            )}
            <EmojiContainer>
              <EmojiBox color={habits.color}>
                <Emoji emoji={habits.emojiId} size={40} />
              </EmojiBox>
            </EmojiContainer>
          </CoverContainer>
          <Description>{habits.description}</Description>
        </HabitInfo>
        <UserGoalInfo>
          <GoalTitleContainer>
            <GoalTitle>{nickname}님의 해빗</GoalTitle>
            <EditButton className="icon-pencil">
              <div>수정</div>
            </EditButton>
          </GoalTitleContainer>
          <GoalContentContainer>
            <GoalSubtitle>하루 목표</GoalSubtitle>
            <GoalContent>{userHabits.goal}</GoalContent>
            <GoalSubtitle>달성율 {userHabits.actualAmount * 100}%</GoalSubtitle>
            <ProgressBar
              percent={userHabits.actualAmount * 100}
              theme={{
                success: { symbol: "🥳", color: "var(--color-mainblue)" },
                active: { symbol: "🔥", color: "var(--color-mainblue)" },
                default: { symbol: "👏", color: "var(--color-lightblue)" },
              }}
            />
          </GoalContentContainer>
        </UserGoalInfo>
      </InfoContainer>
      <Divider />
      <Feed>
        <Post habitsId={habits.habitsId} />
        {posts.length ? (
          <>
            {posts.map((post) => (
              <Post key={uuid()} info={post} />
            ))}
          </>
        ) : (
          <EmptyFeed>
            <div>습관을 실천한 해비터가 아직 없어요. 🤨</div>
          </EmptyFeed>
        )}
      </Feed>
    </HabitContainer>
  );
};

export default Habit;
