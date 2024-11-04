import { NextFunction, Request, RequestHandler, Response } from "express";
import * as userService from "../services/userService";

const updateRecentlyViewedMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productID = req.params.productID;
  const userID = (req as any).viewerID as string;
  await userService.updateRecentlyViewedProducts(userID, productID);
  next();
};

export default updateRecentlyViewedMiddleware;
