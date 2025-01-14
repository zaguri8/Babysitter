import { Request, Response } from "express";
import { JWT, Responses } from "../utils";
import { LoginFormValidator, RegistrationFormValidator } from "../validation/auth.validation";
import * as AuthService from "../services/auth.service";
export async function register(req: Request, res: Response) {
  try {
    const form = RegistrationFormValidator.parse(req.body);

    const existingUser = await AuthService.findUserByEmail(form.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const user = await AuthService.createUser(form);
    res.status(201).json(Responses.created(user, "User created successfully"));
  } catch (e: any) {
    res.status(400).json(Responses.badRequest(e, e.message));
  }
}
export async function login(req: Request, res: Response) {
  try {
    const form = LoginFormValidator.parse(req.body);

    const existingUser = await AuthService.findUserByEmail(form.email);
    if (!existingUser || !existingUser.comparePassword(form.password)) {
      throw new Error("Email or password incorrect");
    }

    const token = JWT.encrypt({
      id: existingUser._id,
      email: existingUser.email,
      isBabysitter: existingUser.isBabysitter,
    });
    res.status(201).json(Responses.ok(token, "User logged in successfully"));
  } catch (e: any) {
    res.status(400).json(Responses.badRequest(e, e.message));
  }
}
export async function me(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const user = await AuthService.findUserById(userId);
    res.status(200).json(Responses.ok(user, "User details fetched successfully"));
  } catch (e: any) {
    res.status(500).json(Responses.serverError(e, e.message));
  }
}
