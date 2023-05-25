const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const authRouter = require("./modules/auth/auth.routes");
const userRouter = require("./modules/user/user.routes");
const { verifyToken } = require("./utilities/jwt");
const serviceRouter = require("./modules/services/services.routes");
const todDoRouter = require("./modules/toDo/toDo.routes");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

const port = process.env.PORT || 3000;

async function start() {
  try {
    await dbConnect();
    app.listen(port, () => {
      console.log(`Server is running on Port:${port}`);
    });
  } catch (err) {
    throw new Error(err);
  }
}

app.use("/auth", authRouter);
app.use("/user", verifyToken, userRouter);
app.use("/service", verifyToken, serviceRouter);
app.use("/todo", verifyToken, todDoRouter);

start();
