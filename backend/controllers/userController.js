import User from "../models/userModel.js";

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

const getUserByLogin = async (req, res) => {
  const email = req.params.email;
  console.log("Username:", email);
  const password = req.params.password;
  console.log("Username:", password);

  try {
    const user = await User.find({ email: email, password: password });

    if (user.length === 0) {
      return res
        .status(404)
        .json({ error: "Users with the specified role not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  const { username, firstname, lastname, email, password, role } = req.body;

  try {
    const newUser = new User({
      username,
      firstname,
      lastname,
      email,
      password,
      role,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getAllUsers,
  getUserById,
  getUserByRole,
  deleteUserById,
  updateUserById,
  getUserByLogin,
  createUser,
};
