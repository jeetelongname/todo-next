import { Query } from "@/models/query";
import { User, InsertUser } from "@/models/user";
// import { Todo } from "@/models/todo";
// import { Tag } from "@/models/tag";

export default interface UserRepo {
  // User CRUD
  user_create(user: InsertUser): Promise<User>;
  user_query(query: Array<Query<User>>): Promise<Array<User>>;
  // user_read(id: string): Promise<User | null>;
  // user_update(id: string, updates: Partial<User>): Promise<User>;
  // user_delete(id: string): Promise<boolean>;

  // get all todos associated with a user
  // TODO for this use query todos
  // user_todo_get_todos(user_id: string): Promise<Array<Todo>>;

  // get all tags a user has used,
  // thinking atm is a double join but figure out later
  // user_tag_get_all_tags(user_id: string): Promise<Array<Tag>>;
}
