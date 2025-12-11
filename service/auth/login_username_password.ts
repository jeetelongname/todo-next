import bcrypt from "bcrypt";
import FailedLogin from "@/errors/LoginFailed";
import UserRepo from "@/interfaces/UserRepo/factory";
import TokenRepo from "@/interfaces/TokenRepo/factory";
import { signAccessToken, signRefreshToken } from "@/utils/jwt";
import { Token } from "@/models/token";

export default async function login_username_password(
  email: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string }> {
  try {
    // Query the user by email
    const users = await UserRepo.user_query([
      { attribute: "email", operand: "==", value: email },
    ]);

    if (users.length === 0) {
      throw new FailedLogin({
        message: "Invalid credentials",
      });
    }

    const user = users[0];

    if (!user.pass_hash) {
      throw new FailedLogin({
        message: "User does not have a password set",
      });
    }

    // Compare the password with the hash
    const passwordMatch = await bcrypt.compare(password, user.pass_hash);

    if (!passwordMatch) {
      throw new FailedLogin({
        message: "Invalid credentials",
      });
    }

    const refreshTokenPayload = await TokenRepo.token_create({
      user_id: user.id,
      created_at: new Date(),
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      type: 'refresh',
    });

    // Generate access and refresh tokens
    const accessToken = signAccessToken({ 
      user_id: user.id,
      created_at: new Date(),
      expires_at: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
      type: 'access',
    } as Token);
    const refreshToken = signRefreshToken(refreshTokenPayload);

    return { accessToken, refreshToken };
  } catch (e) {
    if (e instanceof FailedLogin) {
      throw e;
    }

    throw new FailedLogin({
      message: "Failed to login user",
      cause: e,
    });
  }
}
