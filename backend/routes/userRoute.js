import express from "express";
import {
  getAllUsers,
  getUserById,
  getUserByRole,
  deleteUserById,
  updateUserById,
  register,
  login,
  isAuthenticated,
  getUserInfo,
} from "../controllers/userController.js";
import authenticateUser from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getAllUsers);

router
  .route("/:id")
  .get(getUserById)
  .delete(deleteUserById)
  .put(updateUserById);

router.post("/register", register);
router.post("/login", login);
router.route("/role/:role").get(getUserByRole);
router.get("/auth/isAuthenticated", isAuthenticated);
router.get("/auth/userInfo", authenticateUser, getUserInfo);

export default router;
