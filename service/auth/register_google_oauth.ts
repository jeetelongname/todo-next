import { OAuth2Client, TokenPayload } from "google-auth-library";
import FailedLogin from "@/errors/LoginFailed";
import UserRepo from "@/interfaces/UserRepo/factory";
import TokenRepo from "@/interfaces/TokenRepo/factory";
import { signAccessToken, signRefreshToken } from "@/utils/jwt";
import { Token } from "@/models/token";

// Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default async function login_google_oauth(
  idToken: string
): Promise<{ accessToken: string; refreshToken: string }> {
  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload() as TokenPayload | undefined;

    if (!payload || !payload.sub) {
      throw new FailedLogin({
        message: "Invalid Google token",
      });
    }

    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name ?? "Google User";

    if (!email) {
      throw new FailedLogin({
        message: "Google account email missing",
      });
    }

    // Look for an existing user with this Google ID
    let users = await UserRepo.user_query([
      { attribute: "google_id", operand: "==", value: googleId },
    ]);

    let user;

    if (users.length === 0) {
      // No Google user found → check if email is already registered
      users = await UserRepo.user_query([
        { attribute: "email", operand: "==", value: email },
      ]);

      if (users.length > 0) {
        // Email already exists but no Google ID attached -> link account
        user = users[0];

        await UserRepo.user_update(user.id, {
          google_id: googleId,
        });
      } else {
        // Create a new user
        user = await UserRepo.user_create({
          email,
          name: name,
          google_id: googleId,
        });
      }
    } else {
      user = users[0];
    }

    if (!user) {
      throw new FailedLogin({
        message: "Failed to create or fetch Google user",
      });
    }

    // Create refresh token record
    const refreshTokenPayload = await TokenRepo.token_create({
      user_id: user.id,
      created_at: new Date(),
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      type: "refresh",
    });

    // Generate JWT tokens
    const accessToken = signAccessToken({
      user_id: user.id,
      created_at: new Date(),
      expires_at: new Date(Date.now() + 15 * 60 * 1000),
      type: "access",
    } as Token);

    const refreshToken = signRefreshToken(refreshTokenPayload);

    return { accessToken, refreshToken };
  } catch (e) {
    if (e instanceof FailedLogin) {
      throw e;
    }

    throw new FailedLogin({
      message: "Failed to login with Google",
      cause: e,
    });
  }
}
