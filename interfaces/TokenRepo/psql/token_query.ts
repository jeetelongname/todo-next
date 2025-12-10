import type { Token } from "@/models/token";
import type { TokenRow } from "@/models/database";
import { getDB } from "@/integrations/psql_db";
import type { Query } from "@/models/query";
import UnsupportedQueryOperand from "@/errors/UnsupportedQueryOperand";

export default async function token_query(queries: Array<Query<Token>>): Promise<Array<Token>> {
  const db = await getDB();

  let qb = db.selectFrom("token").selectAll();

  for (const q of queries) {
    const column = q.attribute as keyof TokenRow;

    if (!column) throw new Error('Query column invalid')

    const operand = q.operand;

    switch (operand) {
      case '==':
        qb = qb.where(column, '=', q.value);
        break;
      case '!=':
        qb = qb.where(column, '!=', q.value);
        break;
      case '<':
        qb = qb.where(column, '<', q.value);
        break;
      case '<=':
        qb = qb.where(column, '<=', q.value);
        break;
      case '>':
        qb = qb.where(column, '>', q.value);
        break;
      case '>=':
        qb = qb.where(column, '>=', q.value);
        break;
      default:
        throw new UnsupportedQueryOperand({
          message: `Query Operand ${operand}`
        });
    }
  }

  const result: Array<TokenRow> = await qb.execute();
  return result.map(row => ({ ...row } as Token));
}
