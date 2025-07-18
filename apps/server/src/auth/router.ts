import { os } from '@core/os'
import { AuthService, UserWithPassword } from './service';



const userLogin = os.auth.login.handler(async ({ input, errors, context }) => {
    const user = AuthService.findUserByUsername(input.username);
    if (!user || user.password !== input.password) {
        throw errors.UNAUTHORIZED();
    }
    return user;
})

const userRegister = os.auth.register.handler(async ({ input, errors }) => {
    const existingUser = AuthService.findUserByUsername(input.username);
    if (existingUser) {
        throw errors.CONFLICT();
    }
    const newUser: UserWithPassword = {
        username: input.username,
        email: input.email,
        password: input.password,
    };
    AuthService.addUser(newUser);
    return newUser;
})

export const authRouter = os.auth.router({
    login: userLogin,
    register: userRegister
})