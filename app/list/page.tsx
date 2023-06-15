"use client"

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import axios from 'axios'
import { Avatar, List, ListItemAvatar, Paper, Typography, Skeleton, IconButton } from '@mui/material';
import LoadingIndicator from '@/components/LoadingIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSession } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast';
import PassengerInformation from '@/components/PassengerInformation';

//TODO: implement infinite loading on passengers
import InfiniteLoader from "react-window-infinite-loader";

export type Passenger = {
    _id: string;
    name: string;
    trips: number;
    airline: Airline[];
}

type Airline = {
    id: string;
    name: string;
    logo: string;
    country: string;
    slogan: string;
    website: string;
}

export default function VirtualizedList() {

    const [passengers, setPassengers] = useState<Passenger[]>([])
    const [airlines, setAirlines] = useState<Airline[]>([])
    const [showPassenger, setShowPassenger] = useState<boolean>(false)
    const [passengerInfo, setPassengerInfo] = useState<Passenger | null>(null)
    const session = useSession()

    const getPassengers = async () => {
        try {
            const res = await axios.get('https://api.instantwebtools.net/v1/passenger?page=0&size=100')
            if (res.data) {
                setPassengers(res.data.data)
            } else {
                toast.error('Error getting passengers data!')
            }
        } catch (error) {
            console.log(error)
        }
    }


    const getAirlines = async () => {
        try {
            const res = await axios.get('https://api.instantwebtools.net/v1/airlines')
            if (res.data) {
                setAirlines(res.data)
            } else {
                toast.error('Error getting airlines data!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPassengers()
        getAirlines()
    }, [])

    const deletePassenger = async (id: string) => {
        if (!session.data?.user) {
            toast.error('Please signin to delete user!')
            return
        }
        try {
            const res = await axios.delete(`https://api.instantwebtools.net/v1/passenger/${id}`)
            if (res.status === 200) {
                toast.success('Successfully deleted user!')
                const newPassengers = passengers.filter((passenger) => passenger._id !== id)
                setPassengers(newPassengers)
            } else {
                toast.error('Error deleting user')
            }
        } catch (error) {
            console.log(error)
        }

    }

    const getPassenger = async (id: string) => {
        if (!session.data?.user) {
            toast.error('Please signin to view passenger data!')
            return
        }
        try {
            const res = await axios.get(`https://api.instantwebtools.net/v1/passenger/${id}`)

            if (res.data) {
                setShowPassenger(true)
                setPassengerInfo(res.data)
            } else {
                toast.error('Error getting passenger data')
            }
        } catch (error) {
            console.log(error)
        }

    }


    const AirlineRow = ({ index, isScrolling, style }: ListChildComponentProps) => {

        // FIX: flickering at the scroll end
        const scrolling = isScrolling && index !== (airlines.length - 1)

        return (
            <ListItem style={style} key={index}>
                {scrolling ?
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2 }}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Typography>Loading...</Typography>
                    </Box>
                    :
                    <ListItemButton onClick={() => console.log(airlines[index]['id'])}>
                        <ListItemAvatar>
                            <Avatar alt={airlines[index]['name']} src={airlines[index]['logo']} />

                        </ListItemAvatar>
                        <ListItemText primary={airlines[index]['name']} secondary={`${airlines[index]['website']} trips`} />
                    </ListItemButton>}
            </ListItem>

        );
    }

    const PassengerRow = ({ index, isScrolling, style }: ListChildComponentProps) => {

        // FIX: flickering at the scroll end
        const scrolling = isScrolling && index !== (passengers.length - 1)

        return (
            <ListItem style={style} key={index}>
                {scrolling ?
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2 }}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Typography>Loading...</Typography>
                    </Box>
                    :
                    <ListItemButton >
                        <ListItemAvatar onClick={() => getPassenger(passengers[index]['_id'])}>
                            <Avatar >
                                {(passengers[index]['name'] as string).charAt(0).toUpperCase()}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText onClick={() => getPassenger(passengers[index]['_id'])} primary={passengers[index]['name']} secondary={`${passengers[index]['trips']} trips`} />
                        <IconButton onClick={() => deletePassenger(passengers[index]['_id'])}><DeleteIcon color='error' /></IconButton>
                    </ListItemButton>}
            </ListItem>

        );
    }

    return (
        //TODO: Display as tabs for small screens
        <Box sx={{ p: 5, display: 'flex', width: '100%', height: '100%', justifyContent: 'space-evenly' }}>

            <Paper elevation={3} sx={{ p: 3, minWidth: 360, height: 540 }}>
                {/* <Alert severity="info">This is an info alert — check it out!</Alert> */}
                <Typography variant='h5'>{`Passengers${passengers.length ? '(' + passengers.length + ')' : ''}`}</Typography>


                <List sx={{ width: '100%', height: 520 }}>
                    {passengers.length ?
                        <FixedSizeList
                            useIsScrolling
                            height={520}
                            width={360}
                            itemSize={70}
                            itemCount={passengers.length}
                        >
                            {PassengerRow}
                        </FixedSizeList> :
                        <LoadingIndicator />}
                </List>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, minWidth: 360, height: 540 }}>
                <Typography variant='h5'>{`Airlines${airlines.length ? '(' + airlines.length + ')' : ''}`}</Typography>

                <List sx={{ width: '100%', height: 520 }}>
                    {airlines.length ?
                        <FixedSizeList
                            useIsScrolling
                            height={520}
                            width={360}
                            itemSize={70}
                            itemCount={airlines.length}
                        >
                            {AirlineRow}
                        </FixedSizeList> :
                        <LoadingIndicator subtext='This may take a while' />
                    }
                </List>
            </Paper>
            <Toaster />
            <PassengerInformation
                open={showPassenger}
                passenger={passengerInfo}
                handleClose={() => {
                    setShowPassenger(false)
                    setPassengerInfo(null)
                }} />
        </Box>
    );
}
