import UserRepoPSQL from "./psql";
import UserRepo from "./UserRepo";

function get_todo_impl(): UserRepo {
  return UserRepoPSQL;
}

export default get_todo_impl();
