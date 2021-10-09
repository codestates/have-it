module.exports = {
  create: (req, res) => {
    res.status(200).send("habits create");
  },
  findAll: (req, res) => {
    res.status(200).send("habits findAll");
  },
  findById: (req, res) => {
    res.status(200).send("habits findById");
  },
  participate: (req, res) => {
    res.status(200).send("habits participate");
  },
};
