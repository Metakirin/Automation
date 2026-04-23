/**
 * A button that is intentionally broken.
 *
 * When clicked, it throws an error. QA has filed a bug ticket about this.
 * The fix is to make the click handler do something useful and safe
 * (e.g. display a friendly message) without throwing.
 *
 * See FixMeButton.test.tsx for the behavioural contract the fix must satisfy.
 */
export function FixMeButton() {
  const handleClick = () => {
    throw new Error('FixMeButton is broken: this should not throw.')
  }

  return (
    <button type="button" onClick={handleClick}>
      Fix me
    </button>
  )
}
