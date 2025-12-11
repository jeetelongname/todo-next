import UserRepo from "../UserRepo";
import user_create from "./user_create";
import user_query from "./user_query";
import user_update from "./user_update";

const UserRepoPSQL: UserRepo = {
  user_create,
  user_query,
  user_update,
};

export default UserRepoPSQL;
