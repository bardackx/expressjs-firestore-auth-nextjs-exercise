import { Request, Response } from "express";
import * as productsService from "../services/productsService";

export const getProduct = async (
  req: Request,
  res: Response,
) => {
  const productID = req.params.productID;
  const product = await productsService.getProductByID(productID);

  if (product == null) {
    res.status(404);
    res.end();
    return;
  }

  res.status(200);
  res.send(product);
};

export const getProducts = async (
  req: Request,
  res: Response,
) => {
  const products = await productsService.getAllProducts();
  res.status(200);
  res.send(products);
};
