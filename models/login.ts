export interface UsernamePasswordLoginBody {
  method: 'username_pass';
  email: string;
  password: string;
}

export interface GoogleOAuthLoginBody {
  method: 'google_oauth';
  idToken: string;
}

export type LoginRequestBody =
  | UsernamePasswordLoginBody
  | GoogleOAuthLoginBody;
