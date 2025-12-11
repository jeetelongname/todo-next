import UserRepoPSQL from "./psql";
import UserRepo from "./UserRepo";

function get_user_impl(): UserRepo {
  return UserRepoPSQL;
}

export default get_user_impl();
