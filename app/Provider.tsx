"use client"

import { SessionProvider } from 'next-auth/react'

import { FC } from 'react'

interface ProviderProps {
    children: React.ReactNode
}

const NextAuthProvider: FC<ProviderProps> = ({ children }) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}

export default NextAuthProvider