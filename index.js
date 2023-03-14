require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mainRouter = require("./routes");

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("tiny"));

app.use("/api", mainRouter);

//Error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
  console.log(`app listening in port ${PORT}`);
});
