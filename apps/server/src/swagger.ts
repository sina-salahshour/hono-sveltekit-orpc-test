import { Hono } from "hono"
import { router } from "./router"
import { swaggerUI } from "@hono/swagger-ui"
import { OpenAPIGenerator } from "@orpc/openapi"
import { experimental_ZodToJsonSchemaConverter } from "@orpc/zod/zod4"

export const swaggerApp = new Hono().get
    ("/specs", async (c) => {
        const spec = await openAPIGenerator.generate(router, {
            info: {
                title: 'My Playground',
                version: '1.0.0',
            },
            servers: [
                { url: '/api/openapi' },
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
    .get('/', swaggerUI({ url: '/api/swagger/specs' }))
const openAPIGenerator = new OpenAPIGenerator({
    schemaConverters: [
        new experimental_ZodToJsonSchemaConverter(),
    ],
})