module.exports = {
  create: (req, res) => {
    res.status(200).send("posts create");
  },
  find: (req, res) => {
    res.status(200).send("posts find");
  },
  modify: (req, res) => {
    res.status(200).send("posts modify");
  },
  remove: (req, res) => {
    res.status(200).send("posts remove");
  },
};
