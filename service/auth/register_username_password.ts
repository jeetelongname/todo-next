import bcrypt from "bcrypt";
import FailedToCreateResource from "@/errors/FailedToCreateResource";
import UserRepo from "@/interfaces/UserRepo/factory";

export default async function register_username_password(
  email: string,
  password: string,
  username: string
) {
  try {
    const saltRounds = 10;
    const pass_hash = await bcrypt.hash(password, saltRounds);

    await UserRepo.user_create({
      email,
      pass_hash,
      name: username,
    });
  } catch (e) {
    throw new FailedToCreateResource({
      message: "Failed to create user",
      cause: e,
    });
  }
}
