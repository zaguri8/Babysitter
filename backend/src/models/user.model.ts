import mongoose from "mongoose";
import { PasswordAlgorithms } from "../utils";

export interface UserUnion {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  isBabysitter: boolean;
  comparePassword: (pass: string) => boolean;
}

export interface Babysitter extends UserUnion {
  gender: string;
  address: string;
  age: number;
  hourlyPrice: number;
  experienceYears: number;
  isBabysitter: true;
}

export type Client = UserUnion & { isBabysitter: false };

export type User = Babysitter | Client;

const UserScheme = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s",
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "male",
  },
  address: {
    type: String,
  },
  hourlyPrice: {
    type: Number,
  },
  experienceYears: {
    type: Number,
  },
  isBabysitter: {
    type: Boolean,
  },
});

UserScheme.pre("save", function () {
  if (this.isModified("password")) {
    this.password = PasswordAlgorithms.hash(this.password);
  }
});
UserScheme.methods.comparePassword = function (pass: string) {
  return PasswordAlgorithms.compare(this.password, pass);
};

const UserModel = mongoose.model("user", UserScheme);

export default UserModel;
