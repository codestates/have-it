module.exports = {
  writePost: (req, res) => {
    res.status(200).send("posts create");
  },
  findPost: (req, res) => {
    res.status(200).send("posts find");
  },
  modifyPost: (req, res) => {
    res.status(200).send("posts modify");
  },
  removePost: (req, res) => {
    res.status(200).send("posts remove");
  },
};
