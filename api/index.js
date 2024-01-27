const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const cors = require("cors");

const Post = require("./models/Post");
const jwt = require("jsonwebtoken");
const secret = "faewnjlaifads";
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const cookieParser = require("cookie-parser");
const fs = require("fs");

const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

try {
  mongoose
    .connect(
      "mongodb+srv://blog:blog@cluster0.4c3pw73.mongodb.net/?retryWrites=true&w=majority",
    )
    .then(() => {
      console.log("Connected to db");
    });
} catch (e) {
  console.log(e);
}

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });

    res.json(userDoc);
  } catch (e) {
    console.log(e);

    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.findOne({ username });

    if (!userDoc) {
      // User not found
      return res.status(400).json("Wrong credentials");
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      // Correct credentials, generate JWT
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      // Incorrect password
      res.status(400).json("Wrong credentials");
    }
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token not provided" });
  }

  jwt.verify(token, secret, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token not provided" });
  }

  jwt.verify(token, secret, async (err, info) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    const { title, summary, content } = req.body;

    try {
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });

      res.json(postDoc); // Send the response here
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});
app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20),
  );
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);

  res.json(postDoc);
});

app.listen(4000, () => {
  console.log("running on port 4000");
});
