export interface UsernamePasswordRegisterBody {
  method: 'username_pass';
  username: string;
  password: string;
  email: string;
}

export interface GoogleOAuthRegisterBody {
  method: 'google_oauth';
  idToken: string;
}

export type RegisterRequestBody =
  | UsernamePasswordRegisterBody
  | GoogleOAuthRegisterBody;