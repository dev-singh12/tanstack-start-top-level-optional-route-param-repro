import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/')({ component: App })

function App() {
  const { locale } = Route.useParams()
  console.log('locale:', locale)
  return <div>Hello World {locale}</div>
}
