import { authContract } from './contracts/auth'
import { planetContract } from './contracts/planet'
import { userContract } from './contracts/user'

export * from './contracts'

export const contract = {
    planet: planetContract,
    auth: authContract,
    user: userContract,
}