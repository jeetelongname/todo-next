export type Query<T> = {
  attribute: keyof T;
  operand: '!=' | '<' | '<=' | '==' | '>' | '>=';
  value: Exclude<T[keyof T], undefined>; 
};
