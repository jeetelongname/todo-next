import TokenRepo from "../TokenRepo";
import token_create from "./token_create";
import token_query from "./token_query";

const TokenRepoPSQL: TokenRepo = {
  token_create,
  token_query,
};

export default TokenRepoPSQL;
