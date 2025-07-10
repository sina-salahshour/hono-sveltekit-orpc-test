import { Hono } from "hono";
import { logger } from "hono/logger";
import { OpenAPIHandler } from '@orpc/openapi/fetch'
import { router } from "./router";
import { OpenAPIGenerator } from "@orpc/openapi";
import { experimental_ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { swaggerUI } from "@hono/swagger-ui";


const app = new Hono().basePath('/api');
app.use(logger());


const handler = new OpenAPIHandler(router);
app.use("/rpc/*", async (c, next) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/api/rpc",
    context: {},
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }
  await next();
});

app.get("/swagger/specs", async (c) => {
  const spec = await openAPIGenerator.generate(router, {
    info: {
      title: 'My Playground',
      version: '1.0.0',
    },
    servers: [
      { url: '/api/rpc' },
    ],
    security: [{ bearerAuth: [] }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
  })
  return c.json(spec)
})
app.get('/swagger', swaggerUI({ url: '/api/swagger/specs' }))
const openAPIGenerator = new OpenAPIGenerator({
  schemaConverters: [
    new experimental_ZodToJsonSchemaConverter(),
  ],
})

export default app;
