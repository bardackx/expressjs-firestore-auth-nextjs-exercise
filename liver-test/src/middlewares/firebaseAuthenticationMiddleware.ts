import { NextFunction, Request, RequestHandler, Response } from "express";
import admin from "firebase-admin";
import "../util/initFirebase";

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
