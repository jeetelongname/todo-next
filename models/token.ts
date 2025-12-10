export type Token = {
  id: string;
  user_id: string;
  created_at: Date;
  expires_at: Date;
  type: 
    'access' 
    | 'api-key' 
    | 'magic-link' 
    | 'refresh'
    | 'reset-password' 
    | 'verify-email';
  revoked_at?: Date;
};

export type InsertToken = Omit<Token, "id">