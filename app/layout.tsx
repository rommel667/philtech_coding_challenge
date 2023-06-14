import NavBar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import NextAuthProvider from './Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Virtual List',
  description: 'Virtual List Code Challenge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <NavBar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
