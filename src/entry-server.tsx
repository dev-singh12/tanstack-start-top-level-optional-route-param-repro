import { createStartHandler } from '@tanstack/react-start/server'
import { getRouter } from './router'

const handler = createStartHandler({
        createRouter: getRouter,
} as any)

export default async (request: Request, context: any) => {
        return handler(request, context)
}
