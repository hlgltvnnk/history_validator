'use client';

import React, { useEffect, useState } from 'react';
import { Button, List, Box, ListItemText } from '@mui/material';
import { redirect } from 'next/navigation';

import { ExpandableListItem } from '../../components/ExpandableListItem';
import { eventListSyle, primaryTextStyles } from '../styles';
import { CreateEventDialog} from '../../components/CreateEventDialog'
import { CreateFactDialog} from '../../components/CreateFactDialog'
import { Event } from '@/common/types';
import { fetchEvents } from '@/common/programUtils';
import { useDataContext } from '../Context/store';
import { RedirectType } from 'next/dist/client/components/redirect';

const menuOptions = ['Перейти до фактів', 'Під\'єднати факт', 'Редагувати подію'];
const TIMER = 60000;

const Events: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<Event[]>();
    const [createFact, setCreateFact] = useState(false);
    const [eventTrigger, setEventTrigger] = useState('');

    const { sharedState, setSharedState } = useDataContext(); 

    const onOptionClick = (option: string, id: string) => {
        switch (option) {
            case menuOptions[0]:
                setSharedState({...sharedState, factFilter: id});
                redirect('/facts'); // TODO: fix
            case menuOptions[1]:
                setEventTrigger(id);
                setCreateFact(true);
                break;
            case menuOptions[2]:
                break;
            default:

        }
    };

    const downloadReporters = () => {
        const { program } = sharedState;
        const association = localStorage.getItem("association");
        if (!association || !program)
            return;

        fetchEvents(program, association).then((r) => {
            setItems(r);
        }, (e) => console.log(e));
    };

    useEffect(() => {
        downloadReporters();
        const interval = setInterval(() => {
            downloadReporters();
          }, TIMER);

        return () => clearInterval(interval);
    });

    return (
        <Box sx={eventListSyle}>
            <CreateFactDialog open={createFact} onHandleClose={() => setCreateFact(false)} event={eventTrigger}/>
            <Button variant="contained" onClick={() => setOpen(true)}>Створити подію</Button>
            <CreateEventDialog open={open} onHandleClose={() => setOpen(false)}/>
            <List sx={eventListSyle}>
                {items && items.map((item, index) => (
                    <ExpandableListItem key={item.id + index}
                        menuOptions={{options: menuOptions,
                            onOptionClick: (option) => onOptionClick(option, item.id)}}
                        descriptionChilds={<div>{item.description}</div>}
                    >
                        <ListItemText primary={item.title} primaryTypographyProps={{ sx: primaryTextStyles }}/>
                        <ListItemText primary={item.location} primaryTypographyProps={{ sx: primaryTextStyles }}/>
                    </ExpandableListItem>
                ))}
            </List>
        </Box>);
};

export default Events;