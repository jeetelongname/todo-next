import TagRepoPSQL from "./psql";
import TagRepo from "./TagRepo";

function get_tag_impl(): TagRepo {
  return TagRepoPSQL;
}

export default get_tag_impl();
