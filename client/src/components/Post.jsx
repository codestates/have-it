import React from "react";
import styled from "styled-components";
import uuid from "react-uuid";

const PostContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMine ? "row-reverse" : "row")};
  margin-bottom: 1.5rem;

  :last-of-type {
    margin-bottom: 0;
  }

  .contentContainer {
    background-color: ${(props) => (props.isMine ? "var(--color-lightblue--02)" : "transparent")};
    border: 1px solid
      ${(props) => (props.isMine ? "var(--color-mainblue)" : "var(--color-midgray)")};
  }
`;

const ProfileImage = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 3rem;
  background-image: url(${(props) => props.url});
`;

const ProfileText = styled.div`
  display: flex;
  align-items: baseline;
  font-family: Interop-SemiBold;
  margin-bottom: 0.75rem;
`;

const Nickname = styled.div`
  font-size: 1.125rem;
  margin-right: 0.5rem;
`;

const CreatedAt = styled.div`
  font-size: 1rem;
  color: var(--color-gray);
`;

const Content = styled.div`
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
`;

const ContentContainer = styled.div`
  margin: 0 1.5rem;
  width: calc(100% - 12rem);
  border-radius: 20px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
`;

const PostImage = styled.div`
  width: 100%;
  height: 0;
  padding-top: 60%;
  /* border: 1px solid var(--color-midgray); */
  border-radius: 10px;
  background-image: url(${(props) => props.url});
  background-size: cover;
`;

const Post = () => {
  const nowUserId = 2;
  const posts = [
    {
      postsId: 1,
      usersId: 1,
      nickname: "ssumniee",
      userImage: "../images/profile/pf_6.svg",
      postImage:
        "https://static2.jetpens.com/images/a/000/131/131193.jpg?auto=format&ba=middle%2Ccenter&balph=3&blend64=aHR0cDovL3d3dy5qZXRwZW5zLmNvbS9pbWFnZXMvYXNzZXRzL3dhdGVybWFyazIucG5n&bm=difference&bs=inherit&chromasub=444&fm=jpg&h=400&mark64=aHR0cDovL3d3dy5qZXRwZW5zLmNvbS9pbWFnZXMvYXNzZXRzL3dhdGVybWFyazEucG5n&markalign=top%2Cright&markalpha=30&markscale=16&q=90&usm=20&w=600&s=7153d8812812e4ead75b8a4ace86516d",
      content: "오늘도 칭찬 일기 작성 끝~ 점점 습관이 되는게 느껴진다..!",
      createdAt: "2021-10-13 10:55:51",
    },
    {
      postsId: 2,
      usersId: 2,
      nickname: "leezy_kim",
      userImage: "../images/profile/pf_8.svg",
      postImage: "https://scienceoflove.co.kr/wp-content/uploads/2018/05/sol811_illu_02.png",
      content: "칭찬? 그게 뭔데여 ㅎㅅㅎ",
      createdAt: "2021-10-13 10:55:51",
    },
  ];

  return (
    <>
      {posts.map((post) => (
        <PostContainer key={uuid()} isMine={nowUserId === post.usersId}>
          <ProfileImage url={post.userImage} />
          <ContentContainer
            className="contentContainer"
            key={post.postsId}
            isMine={nowUserId === post.usersId}
          >
            <ProfileText>
              <Nickname>{post.nickname}</Nickname>
              <CreatedAt>{post.createdAt}</CreatedAt>
            </ProfileText>
            <Content>{post.content}</Content>
            <PostImage url={post.postImage} />
          </ContentContainer>
        </PostContainer>
      ))}
    </>
  );
};

export default Post;
