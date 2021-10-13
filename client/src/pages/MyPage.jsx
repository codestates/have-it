import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Cards from "../components/Cards";

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
      color: var(--color-black);
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
  background-image: url("../images/profile/pf_1.svg");
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
const SaveButton = styled.div`
  width: 15rem;
  height: 2.25rem;
  border: 1px solid var(--color-midgray--04);
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
  width: 100%;
  margin-bottom: 1.5rem;
  button {
    font-size: 1.5rem;
    margin-right: 1.5rem;
  }
`;

const MyHabit = styled.div`
  height: calc(100vh - 30rem);
  overflow: scroll;
`;

const MyPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const getNaverLogin = async (authorizationCode) => {
    const res = await axios({
      method: "post",
      url: "http://localhost:8080/auth/naver",
      data: {
        authorizationCode,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      // 이미 네이버로 로그인했던 적 있는 사람
      // TODO: auth reducer 업데이트
    }
    if (res.status === 201) {
      // 네이버로 이제 가입하는 사람
      // TODO: auth reducer 업데이트
    }
  };

  const getGoogleLogin = async (authorizationCode) => {
    const res = await axios({
      method: "post",
      url: "http://localhost:8080/auth/google",
      data: {
        authorizationCode,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      // 이미 구글로 로그인했던 적 있는 사람
      // TODO: auth reducer 업데이트
    }
    if (res.status === 201) {
      // 구글로 이제 가입하는 사람
      // TODO: auth reducer 업데이트
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    if (authorizationCode) {
      if (state === "naver") {
        getNaverLogin(authorizationCode);
      } else {
        getGoogleLogin(authorizationCode);
      }
    }
  }, []);

  const handleFileChange = async (event) => {
    console.log(event.target.files);
    const fileInfo = event.target.files[0];
    setSelectedFile(fileInfo);
    console.log(selectedFile);
  };

  const handleFileUpload = () => {
    console.log(1);
    const formData = new FormData();
    console.log(formData);
    formData.append("userfile", selectedFile, selectedFile.name);

    axios
      .post("http://localhost:8080/uploads/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MyPageView>
      {!isEditMode ? (
        <ProfileView>
          <ProfileImage src="../images/profile/pf_1.svg" />
          <Container>
            <ProfileUsername>Leezy_Kim</ProfileUsername>
            <ProfileUserBio>
              🐢하루하루 꾸준히😌 <br />
              🔥Never Say Never🔥
            </ProfileUserBio>
            <ProfileEditButton onClick={() => setIsEditMode(true)}>프로필 수정</ProfileEditButton>
          </Container>
        </ProfileView>
      ) : (
        <ProfileEditView onSubmit={handleFileUpload}>
          <ProfileEditImage>
            <ProfileEditLabel htmlFor="image">프로필 이미지 수정</ProfileEditLabel>
            <ProfileEditInput type="file" id="image" name="image" onChange={handleFileChange} />
          </ProfileEditImage>
          <Container>
            <ProfileEditUsername>
              <div>Name</div>
              <input type="text" placeholder="Leezy_kim" />
            </ProfileEditUsername>
            <ProfileEditUserBio>
              <div>Bio</div>
              <textarea
                placeholder={`🐢하루하루 꾸준히😌
🔥Nerver Say Never🔥`}
              />
            </ProfileEditUserBio>
            <ButtonContainer>
              <CancelButton onClick={() => setIsEditMode(false)}>취소</CancelButton>
              <SaveButton>
                <input type="submit" value="저장" />
              </SaveButton>
            </ButtonContainer>
            <DeleteAccountButton>회원 탈퇴</DeleteAccountButton>
          </Container>
        </ProfileEditView>
      )}
      <AchievementView>
        <Title>나의 뱃지</Title>
        <Badges>
          <img src="../images/badge/badge_1.svg" alt="badge_운동" />
          <img src="../images/badge/badge_2.svg" alt="badge_운동" />
          <img src="../images/badge/badge_3.svg" alt="badge_운동" />
          <img src="../images/badge/badge_4.svg" alt="badge_운동" />
          <img src="../images/badge/badge_5.svg" alt="badge_운동" />
        </Badges>
        <Status>
          <button type="button">진행중 해빗</button>
          <button type="button">완료한 해빗</button>
        </Status>
        <MyHabit>
          <Cards />
        </MyHabit>
      </AchievementView>
    </MyPageView>
  );
};

export default MyPage;
