import { Hono } from "hono";
import { logger } from "hono/logger";
import { RPCHandler } from '@orpc/server/fetch'
import { router } from "./router";
import { swaggerApp } from "./swagger";
import { OpenAPIHandler } from "@orpc/openapi/fetch";


const app = new Hono().basePath('/api');
app.use(logger());

app.route('/swagger', swaggerApp)


const openApiHandler = new OpenAPIHandler(router);
app.use("/openapi/*", async (c, next) => {
  const { matched, response } = await openApiHandler.handle(c.req.raw, {
    prefix: "/api/openapi",
    context: {},
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
    context: {},
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }
  await next();
});


export default app;
