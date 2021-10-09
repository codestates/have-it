module.exports = {
  modify: (req, res) => {
    res.status(200).send("users modify");
  },
  remove: (req, res) => {
    res.status(200).send("users remove");
  },
  signin: (req, res) => {
    res.status(200).send("users signin");
  },
  signout: (req, res) => {
    res.status(200).send("users signout");
  },
  signup: (req, res) => {
    res.status(200).send("users signup");
  },
};
