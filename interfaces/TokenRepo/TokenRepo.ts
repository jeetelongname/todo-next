import { Query } from "@/models/query";
import { Token, InsertToken } from "@/models/token";

export default interface TokenRepo {
  token_create(token: InsertToken): Promise<Token>;
  token_query(query: Array<Query<Token>>): Promise<Array<Token>>;
}
