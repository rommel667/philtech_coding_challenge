"use client"

import { FC } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

import { Typography, Box } from '@mui/material';

interface LoadingIndicatorProps {
    subtext?: string
}

const LoadingIndicator: FC<LoadingIndicatorProps> = ({ subtext }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <CircularProgress />
            {subtext && <Typography variant='caption'>{subtext}</Typography>}
        </Box>
    );
}

export default LoadingIndicator;