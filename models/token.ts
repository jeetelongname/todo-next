export type Token = {
  id: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
  type: 
    'access' 
    | 'verify-email' 
    | 'reset-password' 
    | 'api-key' 
    | 'refresh';
  revokedAt?: Date;
};
