const {
  createTodo,
  getAllUserToDos,
  deleteTodo,
  toggleToDoCompletion,
} = require("./toDo.controller");
const router = require("express").Router;

const todDoRouter = router();

todDoRouter.post("/create", createTodo);
todDoRouter.get("/get-user-todos", getAllUserToDos);
todDoRouter.delete("/delete-todo", deleteTodo);
todDoRouter.patch("/toggle-todo-completion", toggleToDoCompletion);

module.exports = todDoRouter;
