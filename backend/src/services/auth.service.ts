import UserModel from "../models/user.model";
import { RegistrationForm } from "../validation/auth.validation";

export async function createUser(form: RegistrationForm) {
  const user = await UserModel.create(form);
  return user;
}
export async function findUserByEmail(email: string) {
  const user = await UserModel.findOne({ email });
  return user;
}
export async function findUserById(id: string) {
  const user = await UserModel.findById(id);
  return user;
}
export async function deleteUser(id: string) {
  const user = await UserModel.findByIdAndDelete(id);
  return user;
}

export async function updateUser(id: string, data: Partial<RegistrationForm>) {
  const user = await UserModel.findByIdAndUpdate(id, data, { returnOriginal: false });
  return user;
}
