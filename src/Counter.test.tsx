import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Counter } from './Counter'

describe('Counter', () => {
  it('starts at 0', () => {
    render(<Counter />)
    expect(screen.getByTestId('count')).toHaveTextContent('Count: 0')
  })

  it('increments by exactly 1 on a single click', () => {
    render(<Counter />)
    fireEvent.click(screen.getByRole('button', { name: /increment/i }))
    expect(screen.getByTestId('count')).toHaveTextContent('Count: 1')
  })

  it('increments sequentially on multiple clicks (+1 each)', () => {
    render(<Counter />)
    const button = screen.getByRole('button', { name: /increment/i })
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)
    expect(screen.getByTestId('count')).toHaveTextContent('Count: 3')
  })
})
