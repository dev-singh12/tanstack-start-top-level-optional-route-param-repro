import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/')({
  beforeLoad: ({ params }) => {
    // Reject paths that start with @ (Vite internal paths)
    // or other reserved characters that shouldn't be valid locales
    if (params.locale?.startsWith('@') || params.locale?.startsWith('_')) {
      throw notFound()
    }
  },
  component: App,
})

function App() {
  const { locale } = Route.useParams()
  return <div>Hello World {locale}</div>
}
