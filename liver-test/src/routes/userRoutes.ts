import express from "express";
import { getRecentlyViewed } from "../controllers/userController";
import { firebaseAuthenticationMiddleware } from "../middlewares/firebaseAuthenticationMiddleware";

const router = express.Router();

router.get(
  "/:userID/recentlyViewed",
  firebaseAuthenticationMiddleware,
  getRecentlyViewed,
);

export default router;
