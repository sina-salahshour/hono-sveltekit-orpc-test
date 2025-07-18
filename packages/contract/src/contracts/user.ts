import { oc } from "@orpc/contract";
import z4 from "zod/v4";

export const UserSchema = z4.object({
    username: z4.string().min(1),
    email: z4.email(),
})

export const userInfoContract = oc
    .input(z4.void())
    .route({
        description: "Get user information",
        summary: "info"
    })
    .output(UserSchema)


export const userContract = oc
    .tag("User")
    .errors({
        UNAUTHORIZED: {
            message: "Unauthorized access",
        },
    })
    .router({
        info: userInfoContract,
    })