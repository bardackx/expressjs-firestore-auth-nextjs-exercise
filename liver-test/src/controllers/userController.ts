import { Request, Response } from "express";
import { getRecentlyViewedProducts } from "../services/userService";

export const getRecentlyViewed = async (req: Request, res: Response) => {
  const userID = req.params.userID;
  const products = await getRecentlyViewedProducts(userID);
  res.status(200).send(products);
};
