import ResourceNotFound from "@/errors/ResourceNotFound";
import { getDB } from "@/integrations/psql_db";
import { UserRow } from "@/models/database";
import { User } from "@/models/user";

type UserUpdates = Omit<Partial<User>, "id">

export default async function user_update(
    id: string,
    updates: UserUpdates,
): Promise<User> {
    const db = await getDB()

    const result: UserRow | undefined = await db
        .updateTable("user")
        .set({ ...updates })
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirst()

    if (!result) {
        throw new ResourceNotFound({
            message: `Unable to find user with id ${id} when updating`
        })
    }

    return result
}