const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.get("/jwt-testing", (req, res) => {
  try {
    console.log("Hello");
    res.setHeader(
      "Content-Security-Policy",
      "script-src 'self' *.watchmegrow.com"
    );
    res.setHeader("credentials", "include");
    res.cookie("test_jwt", "token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 60 * 60 * 1000,
      credentials: "include",
    });

    res.json({
      msg: "sdad",
    });
    // res.redirect("/done");
  } catch (err) {
    console.log(err);
    res.json({
      err,
    });
  }
});

app.get("/done", (req, res) => {
  try {
    res.json({
      msg: "success",
    });
  } catch (err) {
    console.log(err);
    res.json({
      err,
    });
  }
});

app.listen(PORT, function () {
  console.log(`App is running in http://localhost:${PORT}`);
});
