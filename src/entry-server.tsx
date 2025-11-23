import { createStartHandler } from '@tanstack/react-start/server'
import { getRouter } from './router'

const handler = createStartHandler({
        createRouter: getRouter,
} as any)

export default async (request: Request, context: any) => {
        const url = new URL(request.url)
        if (url.pathname.startsWith('/@')) {
                // Proxy internal Vite paths to localhost to ensure they are handled correctly by Vite
                // This works even if the request comes from a different IP (e.g. network device)
                try {
                        console.log('Proxying:', `http://localhost:${url.port}${url.pathname}${url.search}`)
                        const response = await fetch(`http://localhost:${url.port}${url.pathname}${url.search}`, {
                                method: request.method,
                                headers: request.headers,
                                body: request.body,
                        })
                        console.log('Proxy response:', response.status)
                        return response
                } catch (e) {
                        console.error('Proxy error:', e)
                        return new Response('Proxy Error', { status: 500 })
                }
        }
        return handler(request, context)
}
