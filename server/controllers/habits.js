module.exports = {
  createHabit: (req, res) => {
    res.status(200).send("habits create");
  },
  findHabits: (req, res) => {
    res.status(200).send("habits findAll");
  },
  findHabitById: (req, res) => {
    res.status(200).send("habits findById");
  },
  joinHabit: (req, res) => {
    res.status(200).send("habits participate");
  },
};
