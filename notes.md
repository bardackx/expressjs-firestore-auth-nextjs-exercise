# Setup

The purpose of this document is to serve as a guide for me in case that I need
to repeat this tech-stack again in the future

## Redis

Run it with docker

```
docker run --name local-redis -p 6379:6379 -d redis
```

## Firestore

Create a new project for firebase emulators, after running it you should have an
entry for auth, functions, firestore, and ui in firebase.json

```
firebase init
```

To setup functions you need to run

```
firebase init functionss
```

And start the emulator by running

```
firebase emulators:start
```

## NodeJS

Setup project with dependencies

### Dependencies

```
npm init -y
npm install express
npm install -D typescript @types/node @types/express ts-node nodemon
```

### Typescript

```
tsc --init
```

tsconfig.json should look like this

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Typescript

package.json scripts should look like this

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "nodemon src/index.ts"
}
```

Deve with `npm run dev` and start with `npm run build` then `npm run start`

### Testing

Install jest and supertest (this one makes testing easier and faster )

```
npm install jest supertest @types/jest @types/supertest --save-dev
```

also do this to initialize jest config file

```
npx ts-jest config:init
```

and run test by running

```
npx jest
```

# Development

## Hello world

```
src/
├── __tests__/
│   └── app.test.ts
├── app.ts
└── index.ts
```

/src/app.ts

```ts
import express, { Application } from "express";
const app: Application = express();
app.use(express.json());
app.get("/health", (req, res) => {
  res.send("API is running");
});
export default app;
```

/src/index.ts

```ts
import app from "./app";
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
```

/src/**tests**/app.test.ts

```ts
import request from "supertest";
import app from "../app";
it("should return 200 on /health", async () => {
  const response = await request(app).get("/health");
  expect(response.status).toBe(200);
});
```

## Adding recentlyViewed endpoint (controller + routes)

```
src/
├── __tests__/
│   └── app.test.ts
├── controllers/
│   └── userController.ts
├── routes/
│   └── userRoutes.ts
├── app.ts
└── index.ts
```

/src/controllers/userController.ts

```ts
import { Request, Response } from "express";
export const getRecentlyViewed = async (req: Request, res: Response) => {
  const userID = req.params.userID;
  res.status(200).send(userID);
};
```

/src/routes/userRoutes.ts

```ts
import express from "express";
import { getRecentlyViewed } from "../controllers/userController";
const router = express.Router();
router.get("/users/:userID/recentlyViewed", getRecentlyViewed);
export default router;
```

/src/app.ts

```ts
import userRoutes from "./routes/userRoutes";
// ...
app.use("/api/v1/users", userRoutes);
// ...
export default app;
```

/src/**tests**/app.test.ts

```ts
// ....
it("should return 200 on /api/v1/users/:userID/recentlyViewed", async () => {
  const response = await request(app).get(
    "/api/v1/users/1234/recentlyViewed",
  );
  expect(response.status).toBe(200);
  expect(response.text).toBe("1234");
});
```

## Adding recentlyViewed implementation (service and dao)

```
src/
├── __tests__/
│   └── app.test.ts
├── controllers/
│   └── userController.ts
├── dao/
│   └── userDAO.ts
├── routes/
│   └── userRoutes.ts
├── services/
│   └── userService.ts
├── types/
│   └── userTypes.ts
├── app.ts
└── index.ts
```

/src/types/userTypes.ts

```ts
export interface RecentlyViewedProduct {
  productID: string;
  timestamp: number;
}
```

/src/dao/userDAO.ts

```ts
import { RecentlyViewedProduct } from "../types/userTypes";

export const getUserRecentlyViewed = async (
  userID: string,
): Promise<RecentlyViewedProduct[]> => {
  // TODO: replace with firebase code later
  return [
    { "productID": "1001", "timestamp": 1730592183196 },
    { "productID": "1002", "timestamp": 1730592183197 },
    { "productID": "1003", "timestamp": 1730592183198 },
    { "productID": "1004", "timestamp": 1730592183199 },
    { "productID": "1005", "timestamp": 1730592183200 },
    { "productID": "1006", "timestamp": 1730592183201 },
    { "productID": "1007", "timestamp": 1730592183202 },
    { "productID": "1008", "timestamp": 1730592183203 },
    { "productID": "1009", "timestamp": 1730592183204 },
    { "productID": "1010", "timestamp": 1730592183205 },
  ];
};
```

/src/services/userService.ts

```ts
import { getUserRecentlyViewed } from "../dao/userDAO";
import { RecentlyViewedProduct } from "../types/userTypes";

export const getRecentlyViewedProducts = async (
  userID: string,
): Promise<RecentlyViewedProduct[]> => {
  return await getUserRecentlyViewed(userID);
};
```

/src/controllers/userController.ts

```ts
import { Request, Response } from "express";
import { getRecentlyViewedProducts } from "../services/userService";

export const getRecentlyViewed = async (req: Request, res: Response) => {
  const userID = req.params.userID;
  const products = await getRecentlyViewedProducts(userID);
  res.status(200).send(products);
};
```

/src/**tests**/app.test.ts

```ts
// ...
it("should return 200 on /api/v1/users/:userID/recentlyViewed", async () => {
  const response = await request(app).get(
    "/api/v1/users/1234/recentlyViewed",
  );
  expect(response.status).toBe(200);
  expect(response.body).toEqual([
    { "productID": "1001", "timestamp": 1730592183196 },
    { "productID": "1002", "timestamp": 1730592183197 },
    { "productID": "1003", "timestamp": 1730592183198 },
    { "productID": "1004", "timestamp": 1730592183199 },
    { "productID": "1005", "timestamp": 1730592183200 },
    { "productID": "1006", "timestamp": 1730592183201 },
    { "productID": "1007", "timestamp": 1730592183202 },
    { "productID": "1008", "timestamp": 1730592183203 },
    { "productID": "1009", "timestamp": 1730592183204 },
    { "productID": "1010", "timestamp": 1730592183205 },
  ]);
});
```

## Adding the products slice (routes, controller, service, dao, types)

```
src/
├── __tests__/
│   └── app.test.ts
├── controllers/
│   ├── userController.ts
│   └── productsController.ts
├── dao/
│   ├── userDAO.ts
│   └── productsDAO.ts
├── routes/
│   ├── userRoutes.ts
│   └── productsRoutes.ts
├── services/
│   ├── userService.ts
│   └── productsService.ts
├── types/
│   ├── userTypes.ts
│   └── productsTypes.ts
├── app.ts
└── index.ts
```

/src/types/productTypes.ts

```ts
export type Product = Readonly<{
  productID: string;
  productName: string;
}>;
```

/src/dao/productDAO.ts

```ts
import { Product } from "../types/productsTypes";
import { RecentlyViewedProduct } from "../types/userTypes";

const mock: Array<Product> = [
  { productID: "1", productName: "Wireless Mouse" },
  // ... etc
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
```

/src/services/productsService.ts

```ts
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
```

/src/controllers/productsController.ts

```ts
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
```

/src/routes/productsRoutes.ts

```ts
import express from "express";
import { getProduct, getProducts } from "../controllers/productsController";

const router = express.Router();

router.get("/:productID", getProduct);
router.get("/", getProducts);

export default router;
```

/src/**tests**/app.ts

```ts
// ...
app.use("/api/v1/products", productsRoutes);
// ...
```

/src/**tests**/app.test.ts

```ts
// ...

it("should return 200 on /api/v1/products", async () => {
  const response = await request(app).get(
    "/api/v1/products",
  );
  expect(response.status).toBe(200);
  expect(response.body.length).toBeGreaterThan(0);
});

it("should return 200 on /api/v1/products/1", async () => {
  const response = await request(app).get(
    "/api/v1/products/1",
  );
  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    productID: "1",
    productName: "Wireless Mouse",
  });
});
```

## Adding firebase authentication middleware and require auth on most endpoints

```
src/
├── __tests__/
│   └── app.test.ts
├── controllers/
│   ├── userController.ts
│   └── productsController.ts
├── dao/
│   ├── userDAO.ts
│   └── productsDAO.ts
├── routes/
│   ├── userRoutes.ts
│   └── productsRoutes.ts
├── middlewares/
│   └── firebaseAuthenticationMiddleware.ts
├── services/
│   ├── userService.ts
│   └── productsService.ts
├── types/
│   ├── userTypes.ts
│   └── productsTypes.ts
├── app.ts
└── index.ts
```

/src/middlewares/firebaseAuthenticationMiddleware.ts

```ts
import { NextFunction, Request, RequestHandler, Response } from "express";
import admin from "firebase-admin";

export const firebaseAuthenticationMiddleware: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    response
      .status(401)
      .send("Unauthorized");
    return;
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    (request as any).viewerID = decodedToken.uid;
    next();
  } catch (error) {
    response.status(401).send("Unauthorized");
  }
};
export default firebaseAuthenticationMiddleware;
```

/src/routes/userRoutes.ts

```ts
// ...
import { firebaseAuthenticationMiddleware } from "../middlewares/firebaseAuthenticationMiddleware";
// ...
router.get(
  "/:userID/recentlyViewed",
  firebaseAuthenticationMiddleware,
  getRecentlyViewed,
);
// ...
```

/src/routes/productsRoutes.ts

```ts
// ...
import firebaseAuthenticationMiddleware from "../middlewares/firebaseAuthenticationMiddleware";
// ...
router.get("/:productID", firebaseAuthenticationMiddleware, getProduct);
// ...
```

/src/**tests**/app.test.ts

```ts
// ...

import admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

// mock firebase-admin BEGIN
jest.mock("firebase-admin", () => ({
  ...jest.mock("firebase-admin"),
  credential: {
    cert: jest.fn(),
  },
  initializeApp: jest.fn(),
  firestore: jest.fn(),
  auth: jest.fn(),
}));

const VALID_TOKEN = "valid_token_123";
const VALID_USER_ID = "valid_user_id_123";

function mockFirebase() {
  (admin.auth as jest.Mocked<any>).mockReturnValueOnce({
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
// mock firebase-admin END

beforeEach(() => {
  mockFirebase();
});

// ...

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

// ...

it("should return 401 on /api/v1/products/1", async () => {
  const response = await request(app)
    .get("/api/v1/products/1");
  expect(response.status).toBe(401);
  expect(response.body).toEqual({});
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

// ...
```

## Update recently view items data (middleware) and use firestore

AAAAAND HERE IS WHERE I STOPPED

How is it possible that there is no official way of mocking firestore for unit testing?

## Include redis in hot functions

## Cloud function trigger?

## Firebase email?

## Swagger

## Error logging
