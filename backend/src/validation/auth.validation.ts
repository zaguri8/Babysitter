import z from "zod";

const UnionRegistrationFormValidation = z.object({
  name: z.string(),
  email: z.string().email("Email badly formatted"),
  password: z.string().min(6, "Password must be atleast length 6"),
  image: z.string().optional(),
  phone: z.string(),
});

const BabySitterRegistrationValidation = UnionRegistrationFormValidation.merge(
  z.object({
    age: z.number(),
    hourlyPrice: z.number(),
    experienceYears: z.number(),
    gender: z.enum(["male", "female"]),
    address: z.string(),
    isBabysitter: z.literal(true),
  })
);

const ClientRegistrationValidtion = UnionRegistrationFormValidation.merge(
  z.object({
    isBabysitter: z.literal(false),
  })
);
export const RegistrationFormValidator = z.union([
  BabySitterRegistrationValidation,
  ClientRegistrationValidtion,
]);
export const LoginFormValidator = z.object({
  email: z.string().email("Email badly formatted"),
  password: z.string().min(6, "Password must be atleast length 6"),
});

export type RegistrationForm = z.infer<typeof RegistrationFormValidator>;

export type LoginForm = z.infer<typeof LoginFormValidator>;
