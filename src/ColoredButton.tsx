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
        // BUG: wrong colours. Per Figma the button should be a soft yellow
        // background (#fef3c7) with dark amber text (#92400e).
        backgroundColor: '#dc2626',
        color: '#ffffff',
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
