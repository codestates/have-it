const { Habit, Userhabit, User, Category, Post } = require("../models");

const DBERROR = (res, err) => {
  res.status(500).json({ message: `Error occured in database: ${err}` });
};

module.exports = {
  writePost: async (req, res) => {
    const { content } = req.body;
    // TODO : req.file S3연결 구현
    const { habits_id } = req.params;
    const users_id = req.userId;
    try {
      let userhabits = await Userhabit.findOne({
        where: { users_id, habits_id },
        attributes: ["userhabits_id"],
      });
      const userhabits_id = userhabits.userhabits_id;
      //TODO S3 이미지 저장후 url을 응답 받은 후 post create 실행
      const postInfo = await Post.create({
        users_id,
        habits_id: +habits_id,
        userhabits_id,
        content,
      });

      res.status(200).json({ postInfo });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  modifyPost: async (req, res) => {
    //TODO: req.file 사진 수정도 가능하게 구현
    const { content } = req.body;
    const { posts_id } = req.params;
    const users_id = req.userId;
    try {
      const postInfo = await Post.findOne({ where: { posts_id, users_id } });
      if (!postInfo) {
        res.status(403).json({ message: "You don't have permission." });
      } else {
        let a = await postInfo.update({ content });
        console.log(a, "aaaaaa");
        res.status(201).json(postInfo);
      }
    } catch (err) {
      DBERROR(res, err);
    }
  },
  removePost: async (req, res) => {
    const { posts_id } = req.params;
    try {
      const postInfo = await Post.findOne({ where: { posts_id } });
      if (req.userId === postInfo.users_id) {
        await postInfo.destroy();
        res.status(200).json({ posts_id });
      } else {
        res.status(403).json({ message: "You don't have permission." });
      }
    } catch (err) {
      DBERROR(res, err);
    }
  },
};
