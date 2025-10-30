import { Tag } from "@/models/tag";

export type Todo = {
  id: string;

  title: string;
  description?: string;
  done: boolean;
  tags: Array<Tag>;
  deadline: Date;
  created: Date;
  completed: Date;
};

export type InsertTodo = {
  title: string;
  description?: string;
  tags: Array<Tag>;
  deadline: Date;
};
