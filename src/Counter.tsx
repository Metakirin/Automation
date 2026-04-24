import { useState } from 'react'

/**
 * A simple counter with an "Increment" button.
 *
 * QA reported that clicking Increment bumps the count by the wrong amount.
 * See Counter.test.tsx for the behavioural contract the fix must satisfy.
 */
export function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => {
    // BUG: should increment by 1, but increments by 2.
    setCount((c) => c + 2)
  }

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <span data-testid="count">Count: {count}</span>{' '}
      <button type="button" onClick={increment}>
        Increment
      </button>
    </div>
  )
}
