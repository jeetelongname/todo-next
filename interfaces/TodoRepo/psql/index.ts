import TodoRepo from "../TodoRepo";

import todo_create from "./todo_create";
import todo_read from "./todo_read";
import todo_does_exist from "./todo_does_exist";
import todo_update from "./todo_update";
import todo_delete from "./todo_delete";

const TodoRepoPSQL: TodoRepo = {
  todo_create,
  todo_read,
  todo_does_exist,
  todo_update,
  todo_delete,
};

export default TodoRepoPSQL;
