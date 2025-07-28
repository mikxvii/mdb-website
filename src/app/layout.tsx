import type { Metadata } from 'next'
import Header from './components/Header'
import './globals.css'

export const metadata: Metadata = {
  title: 'MDB | Mobile Developers of Berkeley',
  description: 'MDB is a community of passionate and innovative mobile developers at UC Berkeley. Join our diverse community of builders, creators, and developers.',
  icons: {
    icon: [
      {
        url: '/images/mdb-logo.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/images/mdb-logo.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/images/mdb-logo.png',
        sizes: '48x48',
        type: 'image/png',
      }
    ],
    apple: [
      {
        url: '/images/mdb-logo.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
    shortcut: '/images/mdb-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="flex-grow pt-20">
          {children}
        </main>
        
        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 MDB Website. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
} 