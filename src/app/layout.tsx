import NavBar from '@/components/Navbar'
import SessionManager from '@/components/SessionManager'
import SessionAuthProvider from '@/context/SessionAuthProvider'
import { Providers } from '@/redux/providers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <main>
          <SessionAuthProvider>
            <Providers>
              <SessionManager>
                <NavBar/>
                {children}
              </SessionManager>
            </Providers>
          </SessionAuthProvider>
        </main>
      </body>
    </html>
  )
}
