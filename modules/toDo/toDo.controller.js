const ToDo = require("./toDo.model");
const User = require("../user/user.model");

const createTodo = async (req, res) => {
  const userId = req.userId;
  const authenticated = req.authenticated;

  try {
    if (!authenticated) return res.status(401).send("Unauthorized");
    const user = await User.findById(userId);
    const todo = await ToDo.create({ ...req.body, userId });
    if (todo) {
      await user.updateOne({ $push: { todos: todo._id } });
      return res.status(201).json({ todo });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Todo creation failed");
  }
};

const getAllUserToDos = async (req, res) => {
  const userId = req.userId;
  try {
    const toDos = await ToDo.find({ userId });
    if (!toDos) res.status(404).json({ toDos });
    return res.status(200).json({ toDos });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Failed to get todos");
  }
};

const toggleToDoCompletion = async (req, res) => {
  const userId = req.userId;
  const { id } = req.query;
  try {
    const toDo = await ToDo.findById(id);
    if (!toDo) return res.status(404).send("Todo not found");
    console.log(toDo);
    const toDoState = toDo.completed;
    await toDo.updateOne({ completed: !toDoState });
    return res.status(200).send("Todo toggled");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Failed to complete todo");
  }
};

const deleteTodo = async (req, res) => {
  const userId = req.userId;
  const { id } = req.query;
  console.log(id);
  try {
    const user = await User.findById(userId);
    await ToDo.findByIdAndDelete(id, { userId });
    await user.updateOne({ $pull: { todos: id } });
    return res.status(200).send("Todo deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Deleting todo failed");
  }
};

module.exports = {
  createTodo,
  deleteTodo,
  getAllUserToDos,
  toggleToDoCompletion,
};
