import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
export const Responses = {
  ok<T>(data?: T, message: string = "") {
    return {
      data,
      status: 200,
      error: null,
      message,
    };
  },
  created<T>(data?: T, message: string = "") {
    return {
      data,
      status: 201,
      error: null,
      message,
    };
  },
  badRequest(error: any, message: string = "") {
    return {
      data: null,
      status: 400,
      error,
      message,
    };
  },
  unauthorized(error: any, message: string = "") {
    return {
      data: null,
      status: 401,
      error,
      message,
    };
  },
  serverError(error: any, message: string = "") {
    return {
      data: null,
      status: 500,
      error,
      message,
    };
  },
} as const;

export const JWT = {
  encrypt: <T extends object>(data: T) => {
    return jwt.sign(data, process.env.JWT_SECRET!);
  },
  decrypt: <T extends object>(token: string): T => {
    return jwt.verify(token, process.env.JWT_SECRET!) as T;
  },
} as const;

export const PasswordAlgorithms = {
  hash: (pass: string) => {
    return bcrypt.hashSync(pass, 10);
  },
  compare: (hashed: string, pass: string) => {
    return bcrypt.compareSync(pass, hashed);
  },
} as const;
