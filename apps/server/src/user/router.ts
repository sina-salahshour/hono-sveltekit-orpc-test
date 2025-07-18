import { os } from "@core/os";


const userInfo = os.user.info.handler(({ context, errors }) => {
    const user = context.user
    if (!user) {
        throw errors.UNAUTHORIZED();
    }
    return user
})

export const userRouter = os.user.router({
    info: userInfo
})