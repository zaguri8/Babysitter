import { RequestHandler } from "express";
import { JWT, Responses } from "../utils";

const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    const tokenHeader = (req.headers["authorization"] || req.headers["Authorization"]) as string;

    if (!tokenHeader) {
      throw new Error("Unauthorized, Token not provided in request");
    }

    const token = tokenHeader.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized, Token badly formatted in request");
    }

    const decoded = JWT.decrypt<{ id: string; email: string; isBabysitter: boolean }>(token);

    req.user = decoded;
    next();
  } catch (e: any) {
    res.status(401).json(Responses.unauthorized(e, e.message));
  }
};

export default authMiddleware;
