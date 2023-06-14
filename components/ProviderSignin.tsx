"use client"

import { Button } from '@mui/material'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { signIn } from 'next-auth/react'

const ProviderSignin = () => {

    const handleGoogleSignin = async () => {
        const res = await signIn('google')
        console.log('GOOGLE RES', res)
    }

    const handleGithubSignin = async () => {
        const res = await signIn('github')
        console.log('GITHUB RES', res)
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