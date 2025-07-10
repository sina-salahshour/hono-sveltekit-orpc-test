import { oc } from '@orpc/contract'
import z from 'zod/v4'

const PlanetSchema = z.object({
    id: z.number().int().min(1),
    name: z.string(),
    description: z.string().optional(),
})

const oldListPlanetContract = oc
    .route({
        description: "List all planets.\n\n warning: Use the new pagination contract instead.",
        deprecated: true,
        summary: "[deprecated] getAll"
    })
    .input(
        z.object({
            page: z.number().int().min(1).default(1),
            pageSize: z.number().int().min(1).max(100).default(10),
        }),
    )
    .output(z.array(PlanetSchema))

const listPlanetContract = oc
    .route({
        description: "List all planets",
        summary: 'list'
    })
    .input(
        z.object({
            limit: z.number().int().min(1).max(100).optional(),
            cursor: z.number().int().min(0).default(0),
        }),
    )
    .output(z.array(PlanetSchema))

const findPlanetContract = oc
    .route({
        description: "Find a planet by ID",
        summary: "find",
    })
    .input(PlanetSchema.pick({ id: true }))
    .output(PlanetSchema)
    .errors({
        NOT_FOUND: {
            message: "planet not found",
        }
    })

const createPlanetContract = oc
    .route({
        description: "Create a new planet",
        summary: "create"
    })
    .input(PlanetSchema.omit({ id: true }))
    .output(PlanetSchema)

export const planetContract = oc
    .tag('Planet')
    .router({
        list: listPlanetContract,
        find: findPlanetContract,
        create: createPlanetContract,

        /**@deprecated */
        getAll: oldListPlanetContract,
    })