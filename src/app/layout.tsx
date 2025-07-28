import type { Metadata } from 'next'
import Header from './components/Header'
import './globals.css'

export const metadata: Metadata = {
  title: 'MDB Website',
  description: 'Modern multi-page website built with Next.js and React',
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