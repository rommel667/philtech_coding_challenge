"use client"

import { Paper, TextField, Divider, Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ProviderSignin from '@/components/ProviderSignin';

const signinSchema = object({
    email: string().nonempty('Email is required').email('Email is invalid'),
    password: string()
        .nonempty('Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
})

type SigninInput = TypeOf<typeof signinSchema>;

const Signin = () => {

    const session = useSession()
    console.log("SESSION", session)

    const router = useRouter()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>('')

    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<SigninInput>({
        resolver: zodResolver(signinSchema),
    });

    useEffect(() => {
        if (session.data && session.status === 'authenticated') {
            router.push('/')
        }
    }, [session, router])

    const onSubmitHandler: SubmitHandler<SigninInput> = async (data) => {
        setLoading(true)
        try {
            const res = await signIn('credentials', { ...data, redirect: false })

            if (res && !res.error) {
                console.log(res)
                router.push('/virtual-list')
            } else {
                console.log(res?.error)
                setError(res?.error)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <Paper
            sx={{ display: 'flex', flexDirection: 'column', width: { xs: '90%', sm: '70%', md: '50%', lg: '30%' }, p: 3, gap: 1, mx: 'auto', mt: 4 }}
        >
            {error && <Typography variant='body1' color='error'>{error}</Typography>}
            <Box
                component='form'
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <TextField
                    sx={{ mb: 2 }}
                    label='Email'
                    fullWidth
                    required
                    type='email'
                    error={!!errors['email']}
                    helperText={errors['email'] ? errors['email'].message : ''}
                    {...register('email')}
                />
                <TextField
                    sx={{ mb: 2 }}
                    label='Password'
                    fullWidth
                    required
                    type='password'
                    error={!!errors['password']}
                    helperText={errors['password'] ? errors['password'].message : ''}
                    {...register('password')}
                />

                <LoadingButton
                    variant='contained'
                    fullWidth
                    type='submit'
                    loading={loading}
                    sx={{ py: '0.8rem', mt: '1rem' }}
                >
                    Signin
                </LoadingButton>
            </Box>

            <Divider sx={{ my: 2 }} />

            <ProviderSignin />
        </Paper>
    )
}

export default Signin