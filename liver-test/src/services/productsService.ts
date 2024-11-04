import * as productsDAO from "../dao/productsDAO";
import { Product } from "../types/productsTypes";

export const getProductByID = async (
  productID: string,
): Promise<Product | null> => {
  return await productsDAO.getProductByID(productID);
};

export const getAllProducts = async (): Promise<Product[]> => {
  return await productsDAO.getAllProducts();
};
