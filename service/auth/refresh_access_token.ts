import { signAccessToken, verifyRefreshToken } from "@/utils/jwt";
import TokenRepo from "@/interfaces/TokenRepo/factory";
import ExpiredToken from "@/errors/TokenExpired";
import { Token } from "@/models/token";
import Unauthorized from "@/errors/Unauthorized";

export default async function refresh_access_token(refreshToken: string) {
  const decodedRefreshToken = await verifyRefreshToken(refreshToken);

  const tokenRecord = await TokenRepo.token_query([
    { attribute: "id", operand: "==", value: decodedRefreshToken.id }
  ]);

  if (tokenRecord.length === 0) {
    throw new Unauthorized({})
  }

  if (
      tokenRecord.length !== 1 ||
      tokenRecord[0].revoked_at ||
      tokenRecord[0].expires_at < new Date()
  ) {
    throw new ExpiredToken({});
  }

  const accessToken = signAccessToken({ 
    user_id: tokenRecord[0].user_id,
    created_at: new Date(),
    expires_at: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    type: 'access',
  } as Token);

  return { accessToken };
}
