export type User = {
  id: string;
  email: string;
  google_id?: string;
  pass_hash?: string;
  name: string;
};

export type InsertUser = {
  email: string;
  google_id?: string;
  pass_hash?: string;
  name: string;
};
