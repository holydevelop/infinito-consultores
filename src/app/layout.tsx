import SessionManager from '@/components/SessionManager'
import SessionAuthProvider from '@/context/SessionAuthProvider'
import { Providers } from '@/redux/providers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reclutalento',
  description: 'Búsquedas eficientes y eficaces de talentos',
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
                {children}
              </SessionManager>
            </Providers>
          </SessionAuthProvider>
        </main>
      </body>
    </html>
  )
}
