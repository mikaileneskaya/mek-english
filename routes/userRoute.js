import express from "express";
import * as userController from "../controllers/userController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(userController.createUser);
router.route("/login").post(userController.loginUser);
router
  .route("/dashboard")
  .get(authMiddleware.authenticateToken, userController.getDashboardPage);
router
  .route("/")
  .get(authMiddleware.authenticateToken, userController.getAllUsers);
router
  .route("/learn")
  .get(authMiddleware.authenticateToken, userController.getenword);
router
  .route("/learnings")
  .get(authMiddleware.authenticateToken, userController.getLearnings);
  router
  .route("/addword")
  .post(authMiddleware.authenticateToken, userController.addWordToUser);
  router
  .route("/incrementKelimem")
  .post(authMiddleware.authenticateToken, userController.incrementKelimem);

export default router;
