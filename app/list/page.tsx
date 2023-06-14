"use client"

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import axios from 'axios'
import { Avatar, List, ListItemAvatar, Paper, Typography } from '@mui/material';
import LoadingIndicator from '@/components/LoadingIndicator';



export default function VirtualizedList() {

    const [passengers, setPassengers] = useState([])

    useEffect(() => {
        const getPassengers = async () => {
            console.log("GETTING PASSENGERS")
            const res = await axios.get('https://api.instantwebtools.net/v1/passenger?page=0&size=100')
            console.log("PASSENGERS", res.data.data)
            setPassengers(res.data.data)
        }
        getPassengers()
    }, [])

    const renderRow = ({ index, style }: ListChildComponentProps) => {
        return (
            <ListItem style={style} key={passengers[index]['id']} disablePadding>
                <ListItemButton onClick={() => console.log(passengers[index]['id'])}>
                    <ListItemAvatar>
                        <Avatar>
                            {(passengers[index]['name'] as string).charAt(0).toUpperCase()}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={passengers[index]['name']} secondary={`${passengers[index]['trips']} trips`} />
                </ListItemButton>
            </ListItem>
        );
    }

    return (
        <Box sx={{ p: 5 }}>
            <Paper elevation={5}>
                <Typography>Passengers List</Typography>
                <List sx={{ width: '100%', height: 550, maxWidth: 360, bgcolor: 'background.paper' }}>
                    {passengers.length ?
                        <FixedSizeList
                            height={550}
                            width={360}
                            itemSize={70}
                            itemCount={100}
                            overscanCount={5}
                        >
                            {renderRow}
                        </FixedSizeList> :
                        <LoadingIndicator />}
                </List>
            </Paper>
        </Box>
    );
}
