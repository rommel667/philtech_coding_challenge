"use client"

import { FC } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Passenger } from '@/app/list/page';

interface PassengerInformationProps {
    open: boolean;
    handleClose: () => void;
    passenger: Passenger | null;
}

const PassengerInformation: FC<PassengerInformationProps> = ({ open, handleClose, passenger }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {passenger?.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Visited: {passenger?.airline.map(item => item.country).join(', ')}
                    </DialogContentText>
                    <DialogContentText>
                        Airlines: {passenger?.airline.map(item => item.name).join(', ')}
                    </DialogContentText>
                    <DialogContentText>
                        Total Trips: {passenger?.trips}
                    </DialogContentText>

                </DialogContent>

            </Dialog>
        </div>
    );
}

export default PassengerInformation