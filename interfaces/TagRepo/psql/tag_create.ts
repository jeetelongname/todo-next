import { InsertTag, Tag } from "@/models/tag";
import { InsertTagRow } from "@/models/database";
import { getDB } from "@/integrations/psql_db";

export async function tag_create(/* tagI: InsertTag */): Promise<Tag> {
  // const db = await getDB();

  throw new Error("tag create undefined");
}

export async function tag_create_multiple(
  tagsI: Array<InsertTag>,
): Promise<Array<Tag>> {
  const db = await getDB();

  return await db
    .with("res", (db) =>
      db
        .insertInto("tag")
        .values(tagsI.map((tagName) => ({ name: tagName }) as InsertTagRow))
        .onConflict((oc) => oc.column("name").doNothing())
        .returningAll(),
    )
    .selectFrom("res")
    .selectAll()
    .unionAll(
      db
        .selectFrom("tag")
        .selectAll()
        .where("name", "in", tagsI as Array<string>),
    )
    .execute();
}
