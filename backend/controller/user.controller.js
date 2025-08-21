import bcrypt from "bcrypt";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(401).json({ message: "User already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "User signup successful" });
  } catch (error) {
    console.log("error in signup", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(403).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    //JWT token code ...
    const token = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD, {
      expiresIn: "1d",
    });
    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };
    res.cookie("jwt", token, cookieOptions);
    return res
      .status(201)
      .json({ message: "User loggedin succeeded", user, token });
  } catch (error) {
    console.log("error in login", error);
    return res.status(500).json({ message: "error in login" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Loggout succeeded" });
  } catch (error) {
    console.log("Error in logout: ", error);
    return res.status(500).json({ errors: "Error in logout" });
  }
};
