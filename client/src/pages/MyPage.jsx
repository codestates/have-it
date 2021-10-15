/* eslint-disable */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../components/Cards";
import authApi from "../api/auth";
import { signInAction, signOutAction, updateInfoAction } from "../store/actions";
import usersApi from "../api/users";
import badgesApi from "../api/badges";

const MyPageView = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(100vh - 6rem);
  width: calc(100vw - 5rem);
  padding: 2rem 0rem;
`;
const ProfileView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 22.5rem;
  height: 100%;
  border-right: 1px solid var(--color-midgray--04);
  button {
    border-radius: 6px;
  }
  input,
  textarea {
    width: 15rem;
    height: 2rem;
    border: 1px solid var(--color-midgray);
    font-weight: var(--fontWeight-medium);
    margin-top: 2px;
    border-radius: 6px;
    resize: none;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    color: var(--color-white);
    line-height: 150%;
    ::placeholder {
      color: var(--color-black);
    }
  }
  textarea {
    height: 6rem;
  }
`;

const ProfileImage = styled.img`
  width: 15rem;
  height: 15rem;
  border: 1px solid var(--color-midgray--04);
  border-radius: 100%;
  margin-bottom: 2.5rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: auto;
  height: 18rem;
`;
const ProfileUsername = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15rem;
  height: 2.25rem;
  font-size: 1.5rem;
  font-family: var(--color-black);
  font-weight: var(--fontWeight-bold);
  margin-bottom: 1.25rem;
`;
const ProfileUserBio = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  text-align: center;
  width: 15rem;
  height: 3rem;
  font-size: 1.125rem;
  line-height: 150%;
  margin-bottom: 2.5rem;
`;

const Button = styled.button`
  width: 15rem;
  height: 2.25rem;
  border: 1px solid var(--color-midgray--04);
`;

const ProfileEditButton = styled(Button)``;

const ProfileEditView = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 22.5rem;
  height: 100%;
  border-right: 1px solid var(--color-midgray--04);
  button {
    border-radius: 6px;
    color: var(--color-gray);
  }
  input,
  textarea {
    width: 15rem;
    height: 2rem;
    border: 1px solid var(--color-midgray);
    font-weight: var(--fontWeight-medium);
    margin-top: 2px;
    border-radius: 6px;
    resize: none;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    color: var(--color-black);
    line-height: 150%;
    ::placeholder {
      color: var(--color-gray);
    }
  }
  textarea {
    height: 6rem;
  }
`;
const ProfileEditImage = styled.div`
  width: 15rem;
  height: 15rem;
  border: 1px solid var(--color-midgray--04);
  border-radius: 100%;
  margin-bottom: 2.5rem;
  background-image: url(${(props) => props.photo});
  background-size: 100%;
`;
const ProfileEditInput = styled.input`
  display: none;
`;
const ProfileEditLabel = styled.label`
  display: block;
  width: 15rem;
  height: 15rem;
  object-fit: cover;
  background-color: var(--color-white);
  font-weight: var(--fontWeight-bold);
  font-size: 1.2rem;
  color: black;
  cursor: pointer;
  margin: -1px;
  text-align: center;
  border-radius: 100%;
  padding: 50% 0;
  opacity: 0%;
  :hover {
    opacity: 50%;
  }
`;
const ProfileEditUsername = styled.div`
  width: 15rem;
  font-size: 0.75rem;
  color: var(--color-gray);
  margin-bottom: 0.625rem;
`;
const ProfileEditUserBio = styled(ProfileEditUsername)`
  margin-bottom: 0.625rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 15rem;
  height: 2.25rem;
`;

const CancelButton = styled(Button)`
  width: 7.2rem;
`;
const SaveButton = styled(Button)`
  width: 7.2rem;
  background-color: var(--color-darkblue);
  color: var(--color-white) !important;
`;
const DeleteAccountButton = styled(Button)`
  margin-top: 2rem;
`;

const AchievementView = styled.div`
  flex-basis: calc(100vw - 22.5rem);
  height: 100%;
  padding: 0rem 3.75rem;
`;
const Title = styled.div`
  font-weight: var(--fontWeight-bold);
  color: var(--color-black);
  font-size: 1.5rem;
`;

const Badges = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 1.5rem 0rem 4rem 0rem;
  img {
    width: 8.75rem;
    height: 8.75rem;
    border: 1px solid var(--color-lightgray);
    border-radius: 100%;
    margin-right: 3rem;
  }
`;
const Status = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
`;
const Ongoing = styled.button`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  margin-right: 1rem;
  color: ${(props) => (props.status === "진행중 해빗" ? "#4D4DFF" : "#111A3D")};
`;
const Complete = styled.button`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  margin-right: 1rem;
  color: ${(props) => (props.status === "완료한 해빗" ? "#4D4DFF" : "#111A3D")};
`;

const MyHabit = styled.div`
  height: calc(100vh - 30rem);
  overflow: scroll;
`;

const MyPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [photo, setPhoto] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [badges, setBadges] = useState([]);
  const [status, setStatus] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector(({ authReducer }) => authReducer);
  const [inputValue, setInputValue] = useState({
    nickname: userInfo.nickname,
    bio: userInfo.bio,
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const getNaverLogin = async (authorizationCode) => {
      const res = await authApi.naver(authorizationCode);
      if (res.status === 200 || res.status === 201) {
        dispatch(signInAction(res.data.data));
        history.push("/mypage");
      }
    };

    const getGoogleLogin = async (authorizationCode) => {
      const res = await authApi.google(authorizationCode);
      if (res.status === 200 || res.status === 201) {
        dispatch(signInAction(res.data.data));
        history.push("/mypage");
      }
    };

    if (code) {
      if (state === "naver") {
        getNaverLogin(code);
      } else {
        getGoogleLogin(code);
      }
    } else {
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
    }
  }, [dispatch]);

  const [filteredHabits, setFilteredHabits] = useState(userInfo.habits);

  useEffect(() => {
    setInputValue({
      nickname: userInfo.nickname,
      bio: userInfo.bio,
    });
  }, [userInfo]);

  useEffect(() => {
    const getBadgesList = async () => {
      const list = await badgesApi.getBadges(userInfo.nickname);
      setBadges(list.data.data);
    };
    getBadgesList();
  }, [userInfo]);

  useEffect(() => {
    setFilteredHabits(userInfo.habits.filter((el) => el.done === status));
  }, []);

  const handleFileChange = (e) => {
    const fileInfo = e.target.files[0];
    const imageUrl = URL.createObjectURL(fileInfo);

    setPhoto(fileInfo);
    setImageUrl(imageUrl);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", photo);
    formData.append("nickname", inputValue.nickname);
    formData.append("bio", inputValue.bio);

    const res = await usersApi.modifyUserInfo(userInfo.usersId, formData);
    dispatch(updateInfoAction(res.data));
    setIsEditMode(false);
  };

  const handleStatusChange = async (e) => {
    await setStatus(e.target.value);
    if (status === "진행중 해빗")
      setFilteredHabits(userInfo.habits.filter((el) => el.done === true));
    else setFilteredHabits(userInfo.habits.filter((el) => el.done === false));
  };

  return (
    <MyPageView>
      {!isEditMode ? (
        <ProfileView>
          <ProfileImage src={userInfo.image} />
          <Container>
            <ProfileUsername>{userInfo.nickname}</ProfileUsername>
            <ProfileUserBio>{userInfo.bio}</ProfileUserBio>
            <ProfileEditButton onClick={() => setIsEditMode(true)}>프로필 수정</ProfileEditButton>
          </Container>
        </ProfileView>
      ) : (
        <ProfileEditView onSubmit={handleSubmit}>
          {imageUrl ? (
            <ProfileEditImage photo={imageUrl}>
              <ProfileEditLabel htmlFor="photo">프로필 이미지 수정</ProfileEditLabel>
              <ProfileEditInput
                id="photo"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
            </ProfileEditImage>
          ) : (
            <ProfileEditImage photo={userInfo.image}>
              <ProfileEditLabel htmlFor="photo">프로필 이미지 수정</ProfileEditLabel>
              <ProfileEditInput
                id="photo"
                type="file"
                accept="image/*,audio/*,video/mp4,video/x-m4v,application/pdf"
                onChange={handleFileChange}
              />
            </ProfileEditImage>
          )}
          <Container>
            <ProfileEditUsername>
              <div>Name</div>
              <input
                name="nickname"
                type="text"
                value={inputValue.nickname}
                placeholder="Leezy_kim"
                onChange={handleInputChange}
              />
            </ProfileEditUsername>
            <ProfileEditUserBio>
              <div>Bio</div>
              <textarea
                name="bio"
                type="text"
                value={inputValue.bio}
                placeholder={`🐢하루하루 꾸준히😌
🔥Nerver Say Never🔥`}
                onChange={handleInputChange}
              />
            </ProfileEditUserBio>
            <ButtonContainer>
              <CancelButton onClick={() => setIsEditMode(false)}>취소</CancelButton>
              <SaveButton type="submit">저장</SaveButton>
            </ButtonContainer>
            <DeleteAccountButton>회원 탈퇴</DeleteAccountButton>
          </Container>
        </ProfileEditView>
      )}
      <AchievementView>
        <Title>나의 뱃지</Title>
        <Badges>
          {badges?.map((el) => (
            <img key={el.categoriesId} src={el.badge.image} />
          ))}
        </Badges>
        <Status>
          <Ongoing type="button" value="진행중 해빗" onClick={handleStatusChange} status={status}>
            진행중 해빗
          </Ongoing>
          <Complete type="button" value="완료한 해빗" onClick={handleStatusChange} status={status}>
            완료한 해빗
          </Complete>
        </Status>
        <MyHabit>
          <Cards isMyPage={false} habits={status === null ? userInfo.habits : filteredHabits} />
        </MyHabit>
      </AchievementView>
    </MyPageView>
  );
};

export default MyPage;
