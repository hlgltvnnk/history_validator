'use client';

import { Button, List, Box, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Reporter, UserType } from '@/common/types';

import { ExpandableListItem } from '@/components/ExpandableListItem';
import CreateReporterDialog from '@/components/CreateReporterDialog';
import { eventListSyle, primaryTextStyles } from '../styles'
import { fetchReporters } from '@/common/programUtils';
import { useDataContext } from '../Context/store'; 

const options = ['Змінити статус'];
const TIMER = 6000;

const Reporters: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<Reporter[]>();
    
    const { sharedState } = useDataContext(); 
    const { userType } = sharedState;

    const downloadReporters = () => {
        const { program, associationName } = sharedState;
        const association = associationName;
        if (!association || !program)
            return;

        fetchReporters(program, association).then((r) => {
            setItems(r);
        }, (e) => console.log(e));
    }

    useEffect(() => {
        downloadReporters();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            downloadReporters();
          }, TIMER);

        return () => clearInterval(interval);
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onOptionClick = (option: string , pubKey: string) => {

    };

    return (
        <Box sx={eventListSyle}>
            { userType === UserType.Admin &&
                <Button variant="contained" onClick={handleClickOpen}>Додати репортера</Button>
            }
            <CreateReporterDialog open={open} onHandleClose={handleClose} />
            <List sx={eventListSyle}>
            {items?.map((item, index) => (
                    <ExpandableListItem key={item.pubKey + index}
                        menuOptions={{options, onOptionClick: (option) => onOptionClick(option, item.pubKey)}}
                    >
                        <ListItemText primary={item.name} primaryTypographyProps={{ sx: primaryTextStyles }}/>
                        <ListItemText primary={item.type.toString()} primaryTypographyProps={{ sx: primaryTextStyles }}/>
                        <ListItemText primary={item.state.toString()} primaryTypographyProps={{ sx: primaryTextStyles }}/>
                        <ListItemText primary={item.pubKey} primaryTypographyProps={{ sx: primaryTextStyles }}/>
                    </ExpandableListItem>
                ))}
            </List>
        </Box>);
};

export default Reporters;