import { Hono } from "hono"
import { OpenAPIGenerator } from "@orpc/openapi"
import { experimental_ZodToJsonSchemaConverter } from "@orpc/zod/zod4"
import { Scalar } from "@scalar/hono-api-reference"
import { router } from "./router"

const openAPIGenerator = new OpenAPIGenerator({
    schemaConverters: [
        new experimental_ZodToJsonSchemaConverter(),
    ],
})

export const openApiApp = new Hono()

    .get('/', Scalar({
        url: '/api/docs/specs',
        baseServerURL: '/',
        layout: 'modern',
        theme: "alternate",
    }))
    .get("/specs", async (c) => {
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