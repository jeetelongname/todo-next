export type Query<T> = {
  attribute: keyof T;
  operand: '!=' | '<' | '<=' | '==' | '>' | '>=';
  value: T[keyof T];
};
