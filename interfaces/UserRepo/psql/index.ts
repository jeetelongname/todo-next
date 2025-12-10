import UserRepo from "../UserRepo";
import user_create from "./user_create";
import user_query from "./user_query";

const UserRepoPSQL: UserRepo = {
  user_create,
  user_query,
};

export default UserRepoPSQL;
