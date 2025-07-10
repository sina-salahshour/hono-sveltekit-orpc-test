import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { ContractRouterClient } from '@orpc/contract'
import { contract } from '@internal/contract'


const link = new RPCLink({
    url: 'http://localhost:5173/api/rpc',
})

export const api: ContractRouterClient<typeof contract> = createORPCClient(link)