import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FixMeButton } from './FixMeButton'

describe('FixMeButton', () => {
  it('renders a button labelled "Fix me"', () => {
    render(<FixMeButton />)
    expect(screen.getByRole('button', { name: /fix me/i })).toBeInTheDocument()
  })

  it('does not throw when clicked', () => {
    render(<FixMeButton />)
    const button = screen.getByRole('button', { name: /fix me/i })
    // The bug: clicking currently throws. The fix must make this pass.
    expect(() => fireEvent.click(button)).not.toThrow()
  })
})
