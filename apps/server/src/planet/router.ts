import { ORPCError } from "@orpc/contract"
import { os } from "@core/os"

type Planet = {
    id: number
    name: string,
    description: string,
}
const planets: Planet[] = []
let lastId = 1

const getAllPlanets = os.planet.getAll
    .handler(({ input }) => {
        return planets
    })

const listPlanet = os.planet.list
    .handler(({ input }) => {
        return planets
    })
const findPlanet = os.planet.find
    .handler(({ input }) => {
        const res = planets.find(item => item.id === input.id)

        if (res == null) {
            throw new ORPCError("NOT_FOUND", {
                message: "planet not found"
            })
        }

        return res
    })

const createPlanet = os.planet.create
    .handler(({ input }) => {
        lastId++
        const newPlanet: Planet = {
            description: input.description ?? '',
            id: lastId,
            name: input.name
        }
        planets.push(newPlanet)
        return newPlanet
    })

export const planetRouter = os.planet.router(
    {
        list: listPlanet,
        find: findPlanet,
        create: createPlanet,
        getAll: getAllPlanets,
    },
)