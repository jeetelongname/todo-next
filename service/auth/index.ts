import register_google_oauth from './register_google_oauth'
import register_username_password from './register_username_password'
import login_username_password from './login_username_password'

const AuthService = {
    login_username_password,
    register_google_oauth,
    register_username_password,
}

export default AuthService