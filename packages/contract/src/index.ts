import { oc } from '@orpc/contract'
import z from 'zod/v4'

const PlanetSchema = z.object({
    id: z.number().int().min(1),
    name: z.string(),
    description: z.string().optional(),
})

const listPlanetContract = oc
    .input(
        z.object({
            limit: z.number().int().min(1).max(100).optional(),
            cursor: z.number().int().min(0).default(0),
        }),
    )
    .output(z.array(PlanetSchema))

const findPlanetContract = oc
    .input(PlanetSchema.pick({ id: true }))
    .output(PlanetSchema)

const createPlanetContract = oc
    .input(PlanetSchema.omit({ id: true }))
    .output(PlanetSchema)

export const contract = {
    planet: {
        list: listPlanetContract,
        find: findPlanetContract,
        create: createPlanetContract,
    },
}