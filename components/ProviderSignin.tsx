"use client"

import { Button } from '@mui/material'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { signIn } from 'next-auth/react'

const ProviderSignin = () => {

    const handleGoogleSignin = async () => {
        await signIn('google')
    }

    const handleGithubSignin = async () => {
        await signIn('github')
    }

    return (
        <>
            <Button
                size='large'
                variant='outlined'
                onClick={handleGoogleSignin}
                sx={{ display: 'flex', gap: 5, alignItems: 'center' }}
            >
                <FcGoogle size={25} />Sign in with Google
            </Button>
            <Button
                size='large'
                variant='outlined'
                onClick={handleGithubSignin}
                sx={{ display: 'flex', gap: 5, alignItems: 'center' }}
            >
                <FaGithub color='black' size={25} />Sign in with Github
            </Button>
        </>
    )
}

export default ProviderSignin