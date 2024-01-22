import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY || "defaultSecretKey";
const tokenExpiry = process.env.TOKEN_EXPIRY || "1800h";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getUserByRole = async (req, res) => {
  const userRole = req.params.role;

  try {
    const users = await User.find({ role: userRole });
    if (users.length === 0) {
      return res
        .status(404)
        .json({ error: "Users with the specified role not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Update user by ID
const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const register = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    const existingUserWithEmail = await User.findOne({ email });
    if (existingUserWithEmail) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error); // Log the actual error
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, secretKey, {
      expiresIn: tokenExpiry,
    });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const isAuthenticated = (req, res) => {
  try {
    const tokenObject =
      req.headers.authorization?.split(" ")[1] ||
      req.query.token ||
      req.cookies.token;

    const token = tokenObject ? tokenObject : null;
    console.log("Received Token:", token);

    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }

    jwt.verify(
      token,
      process.env.SECRET_KEY || "defaultSecretKey",
      (err, decodedToken) => {
        console.log("Decoded Token:", decodedToken);

        if (err) {
          console.error("JWT error", err);
          return res.status(401).json({ isAuthenticated: false });
        }
        res.status(200).json({ isAuthenticated: true });
      }
    );
    console.log("isAuthenticated route accessed");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to extract user information from the token

    // Fetch user information based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userInfo = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getAllUsers,
  getUserById,
  getUserByRole,
  deleteUserById,
  updateUserById,
};
