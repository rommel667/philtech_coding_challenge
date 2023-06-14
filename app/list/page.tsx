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
import InfiniteLoader from "react-window-infinite-loader";
import DeleteIcon from '@mui/icons-material/Delete';

type Passenger = {
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


    useEffect(() => {
        const getPassengers = async () => {
            const res = await axios.get('https://api.instantwebtools.net/v1/passenger?page=0&size=100')
            setPassengers(res.data.data)
        }
        getPassengers()
        const getAirlines = async () => {
            const res = await axios.get('https://api.instantwebtools.net/v1/airlines')
            setAirlines(res.data)
        }
        getAirlines()
    }, [])

    const deletePassenger = async (id: string) => {
        const res = await axios.delete(`https://api.instantwebtools.net/v1/passenger/:${id}`)
        console.log("DELETE", res)
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
                        <ListItemAvatar>
                            <Avatar >
                                {(passengers[index]['name'] as string).charAt(0).toUpperCase()}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={passengers[index]['name']} secondary={`${passengers[index]['trips']} trips`} />
                        <IconButton onClick={() => deletePassenger(passengers[index]['_id'])}><DeleteIcon color='error' /></IconButton>
                    </ListItemButton>}
            </ListItem>

        );
    }

    return (
        <Box sx={{ p: 5, display: 'flex', height: '100%', justifyContent: 'space-around' }}>
            <Paper elevation={3} sx={{ p: 3, minWidth: 360, height: 540 }}>
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
        </Box>
    );
}
