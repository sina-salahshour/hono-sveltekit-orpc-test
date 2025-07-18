import { oc } from "@orpc/contract";
import { UserSchema } from "./user";
import z4 from "zod/v4";

export const UserRegisterSchema = UserSchema.
    extend({
        password: z4.string().min(6),
        confirmPassword: z4.string().min(6)
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const userRegisterContract = oc
    .route({
        description: "Register a new user",
        summary: "register"
    })
    .input(UserRegisterSchema)
    .output(UserSchema)
    .errors({
        CONFLICT: {
            message: "Username or email already exists",
        }
    });


const userLoginSchema = UserRegisterSchema.pick({
    username: true,
    password: true,
})
const userLoginContract = oc
    .route({
        description: "Login a user",
        summary: "login"
    })
    .input(userLoginSchema)
    .output(UserSchema)
    .errors({
        UNAUTHORIZED: {
            message: "Invalid username or password",
        }
    })

export const authContract = oc
    .tag("Auth")
    .router({
        register: userRegisterContract,
        login: userLoginContract
    })