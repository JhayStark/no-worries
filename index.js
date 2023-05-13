const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const authRouter = require("./modules/auth/auth.routes");

dotenv.config();
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

start();
