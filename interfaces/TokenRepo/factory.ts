import TokenRepoPSQL from "./psql";
import TokenRepo from "./TokenRepo";

function get_token_impl(): TokenRepo {
  return TokenRepoPSQL;
}

export default get_token_impl();
