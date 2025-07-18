import { contract } from "@internal/contract";
import { implement } from "@orpc/server";
import { authenticationMiddleware } from "./middlewares/authentication-middleware";

export const os = implement(contract).$context<{
    header: (name: string) => string | undefined
}>().use(authenticationMiddleware)
