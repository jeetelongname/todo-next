export type Token = {
  id: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
  type: 
    'access' 
    | 'api-key' 
    | 'magic-link' 
    | 'refresh'
    | 'reset-password' 
    | 'verify-email';
  revokedAt?: Date;
};
