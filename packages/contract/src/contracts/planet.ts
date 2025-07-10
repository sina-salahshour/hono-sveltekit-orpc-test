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

    })
    .input(
        z.object({
            page: z.number().int().min(1).default(1),
            pageSize: z.number().int().min(1).max(100).default(10),
        }),
    )
    .output(z.array(PlanetSchema))
const listPlanetContract = oc
    .route({ description: "List all planets" })
    .input(
        z.object({
            limit: z.number().int().min(1).max(100).optional(),
            cursor: z.number().int().min(0).default(0),
        }),
    )
    .output(z.array(PlanetSchema))

const findPlanetContract = oc
    .route({ description: "Find a planet by ID" })
    .input(PlanetSchema.pick({ id: true }))
    .output(PlanetSchema)

const createPlanetContract = oc
    .route({ description: "Create a new planet" })
    .input(PlanetSchema.omit({ id: true }))
    .output(PlanetSchema)

export const planetContract = oc
    .tag('planet')
    .router({
        list: listPlanetContract,
        find: findPlanetContract,
        create: createPlanetContract,

        /**@deprecated */
        getAll: oldListPlanetContract,
    })