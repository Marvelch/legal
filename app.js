const express = require("express");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const user = require("./routes/user");
const auth = require("./routes/auth");
const legal = require("./routes/legal");
const verifyToken = require("./middleware/VerifyToken");

dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/users", user);
app.use("/auth", auth);
app.use("/legal", verifyToken, legal);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
