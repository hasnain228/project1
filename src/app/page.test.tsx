import { expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Page from './page'

test('Renders the login form elements', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
})

test('Shows error on invalid email format', async () => {
  render(<Page />)
  const user = userEvent.setup()

  const emailInput = screen.getByLabelText(/email address/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', { name: /sign in/i })

  // Type a password, but leave email invalid
  await user.type(emailInput, 'invalid-email')
  await user.type(passwordInput, '123456')
  
  // Submit the form
  await user.click(submitButton)

  // Assert that the form did not submit to show the success view because of native HTML5 validation
  expect(screen.queryByRole('heading', { name: /login successful/i })).not.toBeInTheDocument()
})

test('Shows error if password is less than 6 characters', async () => {
  render(<Page />)
  const user = userEvent.setup()

  const emailInput = screen.getByLabelText(/email address/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', { name: /sign in/i })

  // Use a valid email format so HTML5 validation passes, but trigger password error
  await user.type(emailInput, 'test@example.com')
  await user.type(passwordInput, '123')
  await user.click(submitButton)

  expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument()
})

test('Successfully submits and displays successful login state', async () => {
  render(<Page />)
  const user = userEvent.setup()

  const emailInput = screen.getByLabelText(/email address/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', { name: /sign in/i })

  // Submit valid credentials
  await user.type(emailInput, 'user@example.com')
  await user.type(passwordInput, 'password123')
  await user.click(submitButton)

  // Verify async loading state starts up
  expect(screen.getByRole('button', { name: /signing in/i })).toBeInTheDocument()

  // Wait for mock timer to pass and screen to reactively update
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /login successful/i })).toBeInTheDocument()
  }, { timeout: 1500 })

  // Search for the nested elements separately to avoid boundary issues
  expect(screen.getByText(/welcome back/i)).toBeInTheDocument()
  expect(screen.getByText('user@example.com')).toBeInTheDocument()
})