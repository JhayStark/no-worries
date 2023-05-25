const { createTodo, getAllUserToDos } = require("./toDo.controller");
const router = require("express").Router;

const todDoRouter = router();

todDoRouter.get("/create", createTodo);
todDoRouter.get("/get-user-todos", getAllUserToDos);

module.exports = todDoRouter;
