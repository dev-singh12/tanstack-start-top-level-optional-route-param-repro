import { createRouter } from '@tanstack/react-router'

// Importing the generated route tree
import { routeTree } from './routeTree.gen'

// creating a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  })

  return router
}
