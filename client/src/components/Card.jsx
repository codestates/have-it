import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Emoji } from "emoji-mart";
import uuid from "react-uuid";
import { useHistory } from "react-router-dom";
import {
  signInModalOnAction,
  habitJoinModalOnAction,
  habitJoinProceedAction,
} from "../store/actions";

const CardContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  color: var(--color-white);
`;

const Icon = styled.div`
  flex: 0;
  margin: 0;
  font-size: 2rem;
`;

const Title = styled.div`
  flex: 1 1 0;
  margin: 0.75rem 0;
  font-family: Interop-SemiBold;
  font-size: 1.25rem;
`;

const Info = styled.div`
  flex: 0;
  font-size: 0.8em;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Users = styled.div`
  flex: 0;
  display: flex;
  flex-direction: row-reverse;
  width: fit-content;
`;

const ProfileImage = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  margin-right: -0.25rem;
  z-index: 1;
  background-image: url(${(props) => props.profileUrl});
  filter: drop-shadow(0 0 6px var(--color-shadow));
`;

const More = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  margin-right: -0.25rem;
  color: var(--color-white);
  border: 1px solid var(--color-white);
  background-color: var(--color-blur);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  filter: drop-shadow(0 0 12px var(--color-blurshadow));
`;

const Count = styled.div`
  flex: 0 0 1;
  margin-left: 0.75rem;
  font-family: Interop-SemiBold;
  font-size: 1rem;
  height: 1.15rem;
`;

const Card = ({ habit, isJoin }) => {
  const { isLogin } = useSelector(({ authReducer }) => authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    if (!isLogin) {
      return dispatch(signInModalOnAction);
    }
    if (!isJoin) {
      // TODO: Join Reducer 업데이트
      dispatch(habitJoinProceedAction(habit));
      return dispatch(habitJoinModalOnAction);
    }
    return history.push(`/habit/${habit.habitsId}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <Icon>
        <Emoji emoji={habit.emojiId} size={32} />
      </Icon>
      <Title>{habit.title}</Title>
      <Info>
        <Users>
          {habit.topUsers.length &&
            (habit.userCount === habit.topUsers.length && habit.userCount <= 5 ? (
              habit.topUsers
                .reverse()
                .map((user) => <ProfileImage key={uuid()} profileUrl={user.image} />)
            ) : (
              <>
                <More className="icon-dot-3" />
                {habit.topUsers
                  .slice(0, 4)
                  .reverse()
                  .map((user) => (
                    <ProfileImage key={uuid()} profileUrl={user.image} />
                  ))}
              </>
            ))}
        </Users>
        <Count>{habit.userCount}명 참여중</Count>
      </Info>
    </CardContainer>
  );
};

Card.propTypes = {
  habit: PropTypes.shape({
    habitsId: PropTypes.number,
    title: PropTypes.string,
    emojiId: PropTypes.string,
    color: PropTypes.string,
    userCount: PropTypes.number,
    topUsers: PropTypes.arrayOf(
      PropTypes.shape({ usersId: PropTypes.string, image: PropTypes.string })
    ),
  }).isRequired,
  isJoin: PropTypes.bool,
};

Card.defaultProps = {
  isJoin: false,
};

export default Card;
