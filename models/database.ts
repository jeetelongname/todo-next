import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  todo: TodoTable;
  user: UserTable;
  tag: TagTable;
  session: SessionTable;
}

type TodoTable = {
  id: Generated<string>;

  title: string;
  description: string | null;
  done: boolean;
  deadline: ColumnType<Date>;
  created: ColumnType<Date, never>;
  completed: ColumnType<Date>;
};

export type TodoRow = Selectable<TodoTable>;
export type InsertTodoRow = Insertable<TodoTable>;
export type TodoUpdate = Updateable<TodoTable>;

type UserTable = {
  id: Generated<string>;

  email: string;
  pass_hash: string;
  name: string;
};

export type UserRow = Selectable<UserTable>;
export type InsertUserRow = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

type TagTable = {
  id: Generated<string>;

  name: string;
};

export type TagRow = Selectable<TagTable>;
export type InsertTagRow = Insertable<TagTable>;
export type TagUpdate = Updateable<TagTable>;

type SessionTable = {
  id: Generated<string>;

  user_id: string;
  ip: string;
  created: ColumnType<Date>;
};

export type SessionRow = Selectable<SessionTable>;
export type InsertSessionRow = Insertable<SessionTable>;
export type SessionUpdate = Updateable<SessionTable>;
