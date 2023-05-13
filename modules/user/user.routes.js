const {
  updateUserProfile,
  addInterest,
  removeInterest,
} = require("./user.controller");
const router = require("express").Router;

const userRouter = router();

userRouter.post("/update", updateUserProfile);
userRouter.post("/add-interest", addInterest);
userRouter.post("/remove-interest", removeInterest);

module.exports = userRouter;
