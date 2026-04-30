import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ColoredButton } from './ColoredButton'

describe('ColoredButton', () => {
  it('renders the "Click Me" label', () => {
    render(<ColoredButton />)
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument()
  })

  it('uses the Figma background colour (#fef3c7)', () => {
    render(<ColoredButton />)
    const button = screen.getByRole('button', { name: /click me/i })
    // jsdom canonicalises hex inline styles to rgb()
    expect(button.style.backgroundColor).toBe('rgb(254, 243, 199)')
  })

  it('uses the Figma text colour (#92400e)', () => {
    render(<ColoredButton />)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button.style.color).toBe('rgb(146, 64, 14)')
  })
})
