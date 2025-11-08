import TagRepo from "@/interfaces/TagRepo/TagRepo";

import { tag_create, tag_create_multiple } from "./tag_create";
import tag_read from "./tag_read";
import tag_delete from "./tag_delete";
import todo_tag_get_tags from "./todo_tag_get_tags";
import {
  todo_tag_get_todos,
  todo_tag_get_todos_multiple_tags,
} from "./todo_tag_get_todo";

const TagRepoPSQL: TagRepo = {
  tag_create,
  tag_create_multiple,
  tag_read,
  tag_delete,

  todo_tag_get_todos,
  todo_tag_get_todos_multiple_tags,

  todo_tag_get_tags,
};

export default TagRepoPSQL;
