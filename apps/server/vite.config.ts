import { defineConfig } from 'vite'
import build from '@hono/vite-build/node'
import devServer from '@hono/vite-dev-server'
import path, { resolve } from 'node:path'
import url from 'node:url'

const _dirname = path.dirname(url.fileURLToPath(import.meta.url))
export default defineConfig({
    plugins: [
        build({
            entry: './src/index.ts',
            port: 3500,
        }),
        devServer({
            entry: './src/index.ts',
        })
    ],
    resolve: {
        alias: {
            "@internal/contract": resolve(_dirname, "../../packages/contract/src"),
            "@core": resolve(_dirname, "./src/core"),
        }
    },
})