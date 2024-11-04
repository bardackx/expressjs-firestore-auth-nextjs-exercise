import request from "supertest";
import app from "../app";
import admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import * as userDAO from "../dao/userDAO";

import * as x from "../dao/userDAO";

jest.mock("firebase-admin", () => ({
  credential: {
    cert: jest.fn(),
  },
  initializeApp: jest.fn(),
  auth: jest.fn(),
  firestore: jest.fn(),
  apps: [],
}));

const VALID_TOKEN = "valid_token_123";
const VALID_USER_ID = "valid_user_id_123";

function mockFirebaseAuth() {
  (admin.auth as jest.Mock).mockReturnValue({
    verifyIdToken: async (token: string): Promise<DecodedIdToken> => {
      if (token !== VALID_TOKEN) {
        throw "rejected promise";
      }
      return {
        uid: VALID_USER_ID,
      } as DecodedIdToken;
    },
  });
}

jest.mock("../dao/userDAO", () => ({
  createRecentlyViewedEntry: jest.fn(),
  deleteRecentlyViewedEntry: jest.fn(),
  getUserRecentlyViewed: jest.fn(),
  updateRecentlyViewedTimestamp: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks(); // Clear mocks before each test

  (userDAO.createRecentlyViewedEntry as jest.Mock).mockReturnValue("");
  (userDAO.deleteRecentlyViewedEntry as jest.Mock).mockReturnValue("");
  (userDAO.updateRecentlyViewedTimestamp as jest.Mock).mockReturnValue("");
  (userDAO.getUserRecentlyViewed as jest.Mock).mockReturnValue([]);

  mockFirebaseAuth();
});

it("should return 200 on /api/v1/products/1", async () => {
  const response = await request(app)
    .get("/api/v1/products/1")
    .set("Authorization", `Bearer ${VALID_TOKEN}`);
  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    productID: "1",
    productName: "Wireless Mouse",
  });
});

it("should return 200 on /health", async () => {
  const response = await request(app).get("/health");
  expect(response.status).toBe(200);
});

it("should return 401 on /api/v1/users/:userID/recentlyViewed", async () => {
  const response = await request(app).get(
    "/api/v1/users/1234/recentlyViewed",
  );
  expect(response.status).toBe(401);
  expect(response.body).toEqual({});
});

it("should return 200 on /api/v1/users/:userID/recentlyViewed", async () => {
  const response = await request(app)
    .get("/api/v1/users/1234/recentlyViewed")
    .set("Authorization", `Bearer ${VALID_TOKEN}`);
  expect(response.status).toBe(200);
});

it("should return 200 on /api/v1/products", async () => {
  const response = await request(app)
    .get("/api/v1/products");
  expect(response.status).toBe(200);
  expect(response.body.length).toBeGreaterThan(0);
});

it("should return 401 on /api/v1/products/1", async () => {
  const response = await request(app)
    .get("/api/v1/products/1");
  expect(response.status).toBe(401);
  expect(response.body).toEqual({});
});
