import { FixMeButton } from './FixMeButton'

export function App() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Automation Routine Demo</h1>
      <p>
        Click the button below. Right now it is broken — it throws an error.
        A Claude routine should be able to pick up the corresponding bug
        ticket and fix it.
      </p>
      <FixMeButton />
    </main>
  )
}
