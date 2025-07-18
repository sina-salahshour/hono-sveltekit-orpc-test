import { os } from "./os";
import { planetRouter } from "../planet/router";
import { authRouter } from "../auth/router";
import { userRouter } from "../user/router";

export const router = os.router({
    planet: planetRouter,
    auth: authRouter,
    user: userRouter
})