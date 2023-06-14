'use client'

import Link from 'next/link'
import { FC } from 'react'
import Button from '@mui/material/Button'

interface GetStartedButtonProps {

}

const GetStartedButton: FC<GetStartedButtonProps> = ({ }) => {
    return (
        <Link href={'/auth/register'}>
            <Button size='large' variant='contained' sx={{ height: 60, width: 200, borderRadius: 20, fontSize: 20 }}>Get Started</Button>
        </Link>
    )
}

export default GetStartedButton