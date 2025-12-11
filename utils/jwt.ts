import { Token } from "@/models/token";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? '1234';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ?? '1234';

const ACCESS_TOKEN_EXPIRY = "15m"; // short-lived access token

if (ACCESS_TOKEN_SECRET === '1234' || REFRESH_TOKEN_SECRET === '1234') {
  console.error("================================")
  console.error("SETUP ENV VARIABLES ACCESS TOKEN SECRET AND REFRESH TOKEN SECRET ARE BOTH 1234")
  console.error("================================")
}

/**
 * Generate a signed access token
 */
export function signAccessToken(payload: Token): string {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

/**
 * Generate a signed refresh token
 */
export function signRefreshToken(payload: Token): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET);
}

/**
 * Verify an access token
 */
export function verifyAccessToken(token: string): Token {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as Token;
}

/**
 * Verify a refresh token
 */
export function verifyRefreshToken(token: string): Token {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as Token;
}
