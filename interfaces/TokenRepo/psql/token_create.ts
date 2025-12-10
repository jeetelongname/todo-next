import type { InsertToken, Token } from "@/models/token";
import type { InsertTokenRow, TokenRow } from "@/models/database";
import { getDB } from "@/integrations/psql_db";

export default async function token_create(token: InsertToken): Promise<Token> {
  const db = await getDB();

  const insertable: InsertTokenRow = {
    user_id: token.user_id,
    created_at: token.created_at,
    expires_at: token.expires_at,
    type: token.type,
  };

  if (token.revoked_at) {
    insertable.revoked_at = token.revoked_at;
  }

  const result: TokenRow = await db
    .insertInto("token")
    .values(insertable)
    .returningAll()
    .executeTakeFirstOrThrow();

  return { ...result } as Token;
}