import { createRouter } from '@tanstack/react-router'

// Importing the  generated route tree
import { routeTree } from './routeTree.gen'

// creating a new router instance
export const getRouter = () => {
  console.log('ROUTE TREE:', JSON.stringify(routeTree, null, 2))
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  })

  return router
}
