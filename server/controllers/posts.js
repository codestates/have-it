const { Userhabit, Post } = require("../models");
const { DeleteImageinTable, DBERROR } = require("./functions");

module.exports = {
  writePost: async (req, res) => {
    // 생성과 동시에 애취브먼트 하나 추가
    const { content } = req.body;
    const { habits_id } = req.params;
    const users_id = req.userId;
    let location;
    if (req.file) {
      location = req.file.location;
    }
    try {
      let userhabits = await Userhabit.findOne({
        where: { users_id, habits_id },
        attributes: ["userhabits_id", "actual_amount"],
      });
      console.log(userhabits.dataValues);
      await userhabits.update({ actual_amount: userhabits.dataValues.actual_amount + 0.1 });
      const userhabits_id = userhabits.dataValues.userhabits_id;
      const postInfo = await Post.create({
        users_id,
        habits_id: +habits_id,
        userhabits_id,
        content,
        image: location,
      });
      res.status(200).json({ message: "ok", data: { postsId: postInfo.dataValues.posts_id } });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  modifyPost: async (req, res) => {
    const { content } = req.body;
    const { posts_id } = req.params;
    const users_id = req.userId;
    let location;
    if (req.file) {
      location = req.file.location;
    }
    try {
      const postInfo = await Post.findOne({ where: { posts_id, users_id } });
      if (!postInfo) {
        res.status(403).json({ message: "You don't have permission.", data: null });
      } else {
        const { image } = postInfo.dataValues;
        if (image && location) {
          DeleteImageinTable(image);
        }
        await postInfo.update({ content, image: location });
        res.status(201).json({ message: "ok", data: { postsId: postInfo.dataValues.posts_id } });
      }
    } catch (err) {
      DBERROR(res, err);
    }
  },
  removePost: async (req, res) => {
    const { posts_id } = req.params;
    try {
      const postInfo = await Post.findOne({ where: { posts_id } });
      const { image } = postInfo.dataValues;
      if (image) {
        DeleteImageinTable(image);
      }
      if (req.userId === postInfo.users_id) {
        const userhabits = await postInfo.getUserhabit();
        userhabits.update({ actual_amount: userhabits.dataValues.actual_amount - 1 });
        await postInfo.destroy();
        res.status(200).json({ message: "ok", data: { postsId: posts_id } });
      } else {
        res.status(403).json({ message: "You don't have permission." });
      }
    } catch (err) {
      DBERROR(res, err);
    }
  },
};
