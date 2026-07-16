import React from 'react'

export const metadata = {
  title: 'Project 1',
  description: 'My Next.js Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}