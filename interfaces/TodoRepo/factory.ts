import TodoRepoPSQL from "./psql";
import TodoRepo from "./TodoRepo";

function get_todo_impl(): TodoRepo {
  return TodoRepoPSQL;
}

export default get_todo_impl();
