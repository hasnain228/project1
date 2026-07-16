import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from './page'

test('Renders the homepage heading correctly', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to Project 1')
})