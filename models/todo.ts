import { Tag } from "@/models/tag";

export type Todo = {
  id: string;

  title: string;
  description?: string;
  done: Boolean;
  tags: Tag[];
  deadline: Date;
  created: Date;
  completed: Date;
};

export type InsertTodo = {
  title: string;
  description?: string;
  tags: Tag[];
  deadline: Date;
};
