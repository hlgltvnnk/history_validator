'use client';

import { AppProvider } from './Context/store'
import ResponsiveAppBar from '../components/ResponsiveAppBar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          < ResponsiveAppBar/>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
