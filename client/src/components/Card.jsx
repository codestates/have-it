import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { authModalOnAction, habitJoinModalOnAction } from "../store/actions";

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

const Card = ({ info }) => {
  const { isLogin } = useSelector(({ authReducer }) => authReducer);
  const dispatch = useDispatch();

  const handleSignInModalOn = () => {
    dispatch(authModalOnAction);
  };

  const handleHabitJoinModalOn = () => {
    dispatch(habitJoinModalOnAction);
  };

  return (
    <CardContainer onClick={isLogin ? handleHabitJoinModalOn : handleSignInModalOn}>
      <Icon>{info.icon}</Icon>
      <Title>{info.title}</Title>
      <Info>
        <Users>
          {info.users.length &&
            (info.count === info.users.length && info.count <= 5 ? (
              // TODO: uuid key 부여
              info.users.reverse().map((url) => <ProfileImage profileUrl={url} />)
            ) : (
              <>
                <More className="icon-dot-3" />
                {info.users
                  .slice(0, 4)
                  .reverse()
                  .map((url) => (
                    // TODO: uuid key 부여
                    <ProfileImage profileUrl={url} />
                  ))}
              </>
            ))}
        </Users>
        <Count>{info.count}명 참여중</Count>
      </Info>
    </CardContainer>
  );
};

Card.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    count: PropTypes.number,
    users: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Card;
