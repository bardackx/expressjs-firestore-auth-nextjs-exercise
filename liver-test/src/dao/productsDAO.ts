import { Product } from "../types/productsTypes";

const mock: Array<Product> = [
  { productID: "1", productName: "Wireless Mouse" },
  { productID: "2", productName: "Bluetooth Headphones" },
  { productID: "3", productName: "USB-C Charger" },
  { productID: "4", productName: "4K Monitor" },
  { productID: "5", productName: "Mechanical Keyboard" },
  { productID: "6", productName: "Gaming Laptop" },
  { productID: "7", productName: "Smartphone Stand" },
  { productID: "8", productName: "Portable SSD" },
  { productID: "9", productName: "Webcam" },
  { productID: "10", productName: "Wireless Router" },
  { productID: "11", productName: "Smartwatch" },
  { productID: "12", productName: "Fitness Tracker" },
  { productID: "13", productName: "USB Hub" },
  { productID: "14", productName: "Laptop Bag" },
  { productID: "15", productName: "External DVD Drive" },
  { productID: "16", productName: "HDMI Cable" },
  { productID: "17", productName: "Game Controller" },
  { productID: "18", productName: "VR Headset" },
  { productID: "19", productName: "Streaming Microphone" },
  { productID: "20", productName: "Drawing Tablet" },
];

export const getProductByID = async (
  productID: string,
): Promise<Product | null> => {
  return mock.find((e) => e.productID === productID) || null;
};

export const getAllProducts = async (): Promise<Product[]> => {
  return mock;
};
