import { ColoredButton } from './ColoredButton'
import { Counter } from './Counter'
import { FixMeButton } from './FixMeButton'

export function App() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Automation Routine Demo</h1>
      <p>
        Components on this page are targeted by a nightly Claude routine
        that watches the GitHub Project board for P1 bugs.
      </p>
      <FixMeButton />
      <Counter />
      <ColoredButton />
    </main>
  )
}
