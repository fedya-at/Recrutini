import express from "express";
import {
  getAllUsers,
  getUserById,
  getUserByRole,
  deleteUserById,
  updateUserById,
  createUser,
  getUserByLogin,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:id")
  .get(getUserById)
  .delete(deleteUserById)
  .put(updateUserById);

router.route("/role/:role").get(getUserByRole);
router.route("/login").post(getUserByLogin);

export default router;
