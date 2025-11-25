import TodoRepo from "../TodoRepo";

import todo_create from "./todo_create";
import todo_read from "./todo_read";
import todo_read_all from "./todo_read_all";
import todo_update from "./todo_update";
import todo_delete from "./todo_delete";

const TodoRepoPSQL: TodoRepo = {
  todo_create,
  todo_read,
  todo_read_all,
  todo_update,
  todo_delete,
};

export default TodoRepoPSQL;
