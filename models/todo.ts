import { Tag, InsertTag } from "@/models/tag";

export type Todo = {
  tags: Array<Tag>;

  id: string;

  title: string;
  description?: string;
  done: boolean;
  deadline: Date;
  created: Date;
  completed?: Date;
};

export type InsertTodo = {
  title: string;
  description: string | null;
  tags: Array<InsertTag | string>;
  deadline: Date;
};
