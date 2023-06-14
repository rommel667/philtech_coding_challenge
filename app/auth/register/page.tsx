"use client"

import { Paper, TextField, FormGroup, FormControlLabel, Checkbox, Typography, FormHelperText, Divider, Box } from '@mui/material'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import ProviderSignin from '@/components/ProviderSignin';
import { useRouter } from 'next/navigation'

const registerSchema = object({
    name: string()
        .nonempty('Name is required')
        .max(32, 'Name must be less than 100 characters'),
    email: string().nonempty('Email is required').email('Email is invalid'),
    password: string()
        .nonempty('Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string().nonempty('Please confirm your password'),
    terms: literal(true, {
        invalid_type_error: 'Accept Terms is required',
    }),
}).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
});

type RegisterInput = TypeOf<typeof registerSchema>;

const Register = () => {

    const router = useRouter()

    const [loading, setLoading] = useState(false);

    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmitHandler: SubmitHandler<RegisterInput> = async (data) => {
        setLoading(true)
        try {
            const res = await axios.post('/api/register', data)
            if (res) {
                router.push('/auth/signin')
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
            <Box
                component='form'
                noValidate autoComplete='off'
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <TextField
                    sx={{ mb: 2 }}
                    label='Name'
                    fullWidth
                    required
                    error={!!errors['name']}
                    helperText={errors['name'] ? errors['name'].message : ''}
                    {...register('name')}
                />
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
                <TextField
                    sx={{ mb: 2 }}
                    label='Confirm Password'
                    fullWidth
                    required
                    type='password'
                    error={!!errors['passwordConfirm']}
                    helperText={
                        errors['passwordConfirm'] ? errors['passwordConfirm'].message : ''
                    }
                    {...register('passwordConfirm')}
                />
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox required />}
                        {...register('terms')}
                        label={
                            <Typography color={errors['terms'] ? 'error' : 'inherit'}>
                                Accept Terms and Conditions
                            </Typography>
                        }
                    />
                    <FormHelperText error={!!errors['terms']}>
                        {errors['terms'] ? errors['terms'].message : ''}
                    </FormHelperText>
                </FormGroup>

                <LoadingButton
                    variant='contained'
                    fullWidth
                    type='submit'
                    loading={loading}
                    sx={{ py: '0.8rem', mt: '1rem' }}
                >
                    Register
                </LoadingButton>
            </Box>

            <Divider sx={{ my: 2 }} />

            <ProviderSignin />
        </Paper>
    )
}

export default Register