import express from "express";
import { getProduct, getProducts } from "../controllers/productsController";
import firebaseAuthenticationMiddleware from "../middlewares/firebaseAuthenticationMiddleware";
import updateRecentlyViewedMiddleware from "../middlewares/updateRecentlyViewedMiddleware";

const router = express.Router();

router.get(
  "/:productID",
  firebaseAuthenticationMiddleware,
  updateRecentlyViewedMiddleware,
  getProduct,
);
router.get("/", getProducts);

export default router;
