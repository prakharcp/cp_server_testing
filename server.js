const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://web.class-proxima.com", // Replace with your frontend URL
    credentials: true,
  })
);

const PORT = process.env.PORT || 4000;

app.get("/jwt-testing", (req, res) => {
  try {
    res.cookie("mycookie", "cookievalue", { maxAge: 900000, httpOnly: true });
    res.send("Cookie set successfully");
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
