require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

// mongoose.connect(process.env.DATABASE_URL).then(()=>console.log("db Connected"));
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);  // Exit the process to avoid hanging the application
  });

const User = require("./models/userModel");
const Note = require("./models/notesModel");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticationToken } = require("./utilities");

app.use(express.json());

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.json({
    msg: "hello",
  });
});

// account creation
app.post("/create-account", async (req, res) => {
  // Check if the body is empty or not present
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: true,
      message: "Please provide valid input",
    });
  }
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(401)
      .json({ error: true, message: "Full Name is required" });
  }

  if (!email) {
    return res.status(401).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(401)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res.json({
      error: true,
      message: "User is already exist",
    });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.TOKEN_KEY, {
    expiresIn: "10m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

app.post("/login", async (req, res) => {
  // Check if the body is empty or not present
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: true,
      msg: "Please provide valid input",
    });
  }
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ msg: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ msg: "User not found" });
  }

  // Additional logic for password validation would go here
  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.TOKEN_KEY, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      msg: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      msg: "Invalid Credentials",
    });
  }
});

app.get("/get-user", authenticationToken, async (req, res) => {
  const { user } = req.user;
  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.sendStatus(401);
  }
  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    msg: "",
  });
});

app.post("/add-note", authenticationToken, async (req, res) => {
  // Check if the body is empty or not present
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: true,
      msg: "Please provide valid input",
    });
  }
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, msg: "Title is required" });
  }
  if (!content) {
    return res.status(400).json({ error: true, msg: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();

    return res.json({
      error: false,
      note,
      msg: "Note added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Internal Server Error",
    });
  }
});

app.put("/edit-note/:noteId", authenticationToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;
  if (!title && !content && !tags) {
    return res.status(400).json({ error: true, msg: "no changes provided" });
  }
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, msg: "Note not Found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();
    return res.json({
      error: false,
      msg: "Note Updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Internal server error",
    });
  }
});

app.get("/get-all-notes", authenticationToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes,
      msg: "All notes retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Internal server error",
    });
  }
});

app.put("/note-pinned/:noteId", authenticationToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;

  //   if (!isPinned) {
  //     return res.status(400).json({ error: true, msg: "no changes provided" });
  //   }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, msg: "Note not Found" });
    }

    note.isPinned = isPinned || false; // commented above condition

    await note.save();
    return res.json({
      error: false,
      msg: "Note pinned successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Internal server error",
    });
  }
});

app.delete("/delete-note/:noteId", authenticationToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, msg: "Note not found" });
    }
    await Note.deleteOne({
      _id: noteId,
      userId: user._id,
    });
    return res.json({
      error: false,
      msg: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Internal server error",
    });
  }
});

app.get("/search-notes/", authenticationToken, async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ error: true, message: "Search query is required" });
  }

  try {
    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    return res.json({
      error: false,
      notes: matchingNotes,
      message: "Notes matching the search query retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({ error: true, message: "Server error" });
  }
});


app.listen(8000, () => console.log("backend is running..."));

module.exports = app;
