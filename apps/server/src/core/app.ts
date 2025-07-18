
import { Hono } from "hono";
import { logger } from "hono/logger";
import { RPCHandler } from '@orpc/server/fetch'
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { openApiApp } from "./docs";
import { router } from "./router";
import { experimental_ZodSmartCoercionPlugin } from "@orpc/zod/zod4";
import { serveStatic } from "@hono/node-server/serve-static";


export const app = new Hono().basePath('/api');
app.use(logger());

app.route('/docs', openApiApp)

app.use('/static/*', serveStatic({
    root: './static/',
    rewriteRequestPath: (path) => path.substring('/api/static/'.length)
}))

const openApiHandler = new OpenAPIHandler(router, {
    plugins: [
        new experimental_ZodSmartCoercionPlugin()
    ]
});
app.use("/openapi/*", async (c, next) => {
    const { matched, response } = await openApiHandler.handle(c.req.raw, {
        prefix: "/api/openapi",
        context: {
            header: c.req.header.bind(c.req)
        },
    });

    if (matched) {
        return c.newResponse(response.body, response);
    }
    await next();
});

const rpcHandler = new RPCHandler(router);
app.use("/rpc/*", async (c, next) => {
    const { matched, response } = await rpcHandler.handle(c.req.raw, {
        prefix: "/api/rpc",
        context: {
            header: c.req.header.bind(c.req)
        },
    });

    if (matched) {
        return c.newResponse(response.body, response);
    }
    await next();
});