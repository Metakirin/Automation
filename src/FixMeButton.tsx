/**
 * A button that is intentionally broken.
 *
 * When clicked, it throws an error. QA has filed a bug ticket about this.
 * The fix is to make the click handler do something useful and safe
 * (e.g. display a friendly message) without throwing.
 *
 * See FixMeButton.test.tsx for the behavioural contract the fix must satisfy.
 */
import { useState } from 'react'

export function FixMeButton() {
  const [message, setMessage] = useState('')

  const handleClick = () => {
    setMessage('Button clicked!')
  }

  return (
    <>
      <button type="button" onClick={handleClick}>
        Fix me
      </button>
      {message && <span>{message}</span>}
    </>
  )
}
