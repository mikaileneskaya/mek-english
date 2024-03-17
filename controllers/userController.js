import User from "../models/userModel.js";
import English from "../models/englishModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    // res.status(201).json({ user: user._id });
    res.redirect("/login");
  } catch (error) {
    console.log("ERROR", error);

    let errors2 = {};

    if (error.code === 11000) {
      errors2.email = "The Email is already registered";
    }

    res.status(400).json(errors2);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    let same = false;

    if (user) {
      same = await bcrypt.compare(password, user.password);
    } else {
      return res.status(401).json({
        succeded: false,
        error: "There is no such user",
      });
    }

    if (same) {
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      res.redirect("/users/dashboard");
    } else {
      return res.status(401).json({
        succeded: false,
        error: "Passwords are not matched",
      });
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const getDashboardPage = async (req, res) => {
  const user = await User.findById({ _id: res.locals.user._id }).populate([]);
  const english = await English.find();

  res.render("dashboard", {
    link: "dashboard",
    user,
    english,
  });
};

const getLearnings = async (req, res) => {
  const user = await User.findById({ _id: res.locals.user._id }).populate([]);
  res.render("learnings", {
    link: "learnings",
    user,
  });
};

const getenword = async (req, res) => {
  try {
    const user = await User.findById({ _id: res.locals.user._id });
    const english = await English.find();

    if (english.length === 0) {
      return res.status(404).send("English words not found");
    }

    res.render("learn", {
      link: "learn",
      user,
      english,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: res.locals.user._id } });
    res.status(200).render("users", {
      users,
      link: "users",
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

async function addWordToUser(req, res) {
  const { userId, word } = req.body;

  try {
    const user = await User.findById({ _id: res.locals.user._id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.selectedWords) {
      user.selectedWords = [word];
    } else {
      if (user.selectedWords.includes(word)) {
        return res.status(400).json({ message: "Word already selected" });
      }

      user.selectedWords.push(word);
    }
    await user.save();

    return res.status(200).json({ message: "Word added successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
}

const incrementKelimem = async (req, res) => {
  try {
    const user = await User.findById(res.locals.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.kelimem) {
      user.kelimem = 5;
    } else {
      user.kelimem += 5;
    }

    await user.save();

    return res
      .status(200)
      .json({ message: "kelimem incremented successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

export {
  createUser,
  loginUser,
  getDashboardPage,
  getAllUsers,
  getenword,
  addWordToUser,
  incrementKelimem,
  getLearnings,
};
