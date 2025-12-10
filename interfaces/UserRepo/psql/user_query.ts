import type { User } from "@/models/user";
import type { UserRow } from "@/models/database";
import { getDB } from "@/integrations/psql_db";
import type { Query } from "@/models/query";
import UnsupportedQueryOperand from "@/errors/UnsupportedQueryOperand";

export default async function user_query(queries: Array<Query<User>>): Promise<Array<User>> {
  const db = await getDB();

  let qb = db.selectFrom("user").selectAll();

  for (const q of queries) {
    const column = q.attribute as keyof UserRow;

    if (!column) throw new Error('Query column invalid')

    const operand = q.operand

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
        })
        break;
    }
  }

  const result: Array<UserRow> = await qb.execute();
  return result.map(row => ({ ...row } as User));
}
