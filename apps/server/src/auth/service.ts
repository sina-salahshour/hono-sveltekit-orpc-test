import { UserSchema } from "@internal/contract";
import z4 from "zod/v4";

export type User = z4.infer<typeof UserSchema>
export type UserWithPassword = User & {
    password: string;
}

export class AuthService {
    static users: UserWithPassword[] = []

    static findUserByUsername(username: string): UserWithPassword | undefined {
        return AuthService.users.find(user => user.username === username);
    }

    static addUser(user: UserWithPassword): void {
        AuthService.users.push(user);
    }
}