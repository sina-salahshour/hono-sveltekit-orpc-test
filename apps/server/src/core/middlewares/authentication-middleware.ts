import { os } from "@orpc/server";
import { AuthService } from "../../auth/service";

export const authenticationMiddleware = os.$context<{ header: (name: string) => string | undefined }>().middleware(async ({ next, context }) => {
    const username = context.header('user-username')
    const user = username != null ? AuthService.findUserByUsername(username) : null
    return await next({
        context: {
            user
        }
    })

})