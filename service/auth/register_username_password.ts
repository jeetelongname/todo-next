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

    const existingUser = await UserRepo.user_query(
      [{ attribute: 'email', operand: '==', value: email }]
    )

    if (existingUser.length !== 0) {
      throw new FailedToCreateResource({
        message: 'Failed to create user',
        cause: 'User already exists'
      })
    }

    await UserRepo.user_create({
      email,
      pass_hash,
      name: username,
    });
  } catch (e) {
    if (e instanceof FailedToCreateResource) {
      throw e
    }

    throw new FailedToCreateResource({
      message: "Failed to create user",
      cause: e,
    });
  }
}
