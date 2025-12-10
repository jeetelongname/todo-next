import register_google_oauth from './register_google_oauth'
import register_magic_link from './register_magic_link'
import register_username_password from './register_username_password'

const AuthService = {
    register_magic_link,
    register_username_password,
    register_google_oauth,
}

export default AuthService