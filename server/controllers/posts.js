module.exports = {
  writePost: (req, res) => {
    res.status(200).send("posts create");
  },
  findPosts: async (req, res) => {},
  modifyPost: (req, res) => {
    res.status(200).send("posts modify");
  },
  removePost: (req, res) => {
    res.status(200).send("posts remove");
  },
};
