/**
 * A "Click Me" button styled per a Figma design.
 *
 * QA reported that the colour does not match the Figma source of truth.
 * The fix should bring the inline `style` into agreement with the design
 * — see the Figma URL on the issue ticket and ColoredButton.test.tsx for
 * the expected colour values.
 */
export function ColoredButton() {
  return (
    <button
      type="button"
      style={{
        backgroundColor: '#fef3c7',
        color: '#92400e',
        border: 'none',
        borderRadius: '10px',
        padding: '10px 20px',
        fontFamily: '"Inter", sans-serif',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '24px',
        cursor: 'pointer',
      }}
    >
      Click Me
    </button>
  )
}
