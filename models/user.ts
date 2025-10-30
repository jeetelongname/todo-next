export type User = {
  id: string;
  email: string;
  pass_hash: string;
  name: string;
};

export type InsertUser = {
  email: string;
  pass_hash: string;
  name: string;
};
