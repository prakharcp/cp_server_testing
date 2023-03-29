const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

app.post("/jwt-testing", (req, res) => {
  try {
    res.cookie("jwt", "token", {
      secure: true,
      sameSite: "Lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
      domain: "web.class-proxima.com",
    });

    res.redirect("/done");
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
