import { oc } from '@orpc/contract'
import z4 from 'zod/v4'

export const PlanetSchema = z4.object({
    id: z4.number().int().min(1),
    name: z4.string(),
    description: z4.string().optional(),
})

const oldListPlanetContract = oc
    .route({
        description: "List all planets.\n\n warning: Use the new pagination contract instead.",
        deprecated: true,
        summary: "[deprecated] getAll"
    })
    .input(
        z4.object({
            page: z4.number().int().min(1).default(1),
            pageSize: z4.number().int().min(1).max(100).default(10),
        }),
    )
    .output(z4.array(PlanetSchema))

const listPlanetContract = oc
    .route({
        description: "List all planets",
        summary: 'list'
    })
    .input(
        z4.object({
            limit: z4.number().int().min(1).max(100).optional(),
            cursor: z4.number().int().min(0).default(0),
        }),
    )
    .output(z4.array(PlanetSchema))

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