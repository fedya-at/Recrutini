import express from "express";
import {
  getAllUsers,
  getUserById,
  getUserByRole,
  deleteUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getAllUsers);

router.route("/:id").get(getUserById).delete(deleteUserById);

router.route("/role/:role").get(getUserByRole);

export default router;
