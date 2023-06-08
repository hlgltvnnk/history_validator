'use client';

import { Button, List, Box, ListItemText, ListItem, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { Evidence, EvidenceType, Fact } from '@/common/types';

import { ExpandableListItem } from '@/components/ExpandableListItem';
import CreateFactDialog from '@/components/CreateFactDialog';
import { eventListSyle,
        primaryTextStyles,
        evidenceListSyle,
        evidenceListItemStyles
    } from '../styles'
import { fetchEvidences, fetchFacts } from '@/common/programUtils';
import { useDataContext } from '../Context/store'; 
import CreateEvidenceDialog from '@/components/CreateEvidenceDialog';
import { EvidenceListItem } from '@/components/EvidenceListItem';

const options = ['Додати доказ'];
const TIMER = 6000;

const Facts: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<Fact[]>();
    const [factId, setFactId] = useState('');
    const [evidDialogOpen, setEvidDialogOpen] = useState(false);
     
    const { sharedState } = useDataContext(); 

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const downloadFacts = () => {
        const { program, associationName } = sharedState;
        const association = associationName;
        if (!association || !program)
            return;

        fetchFacts(program, association).then((r) => {
            setItems(r);
        }, (e) => console.log(e));
    }

    useEffect(() => {
        downloadFacts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            downloadFacts();
          }, TIMER);

        return () => clearInterval(interval);
    });

    const onExpandedHandle = (id: string) => {
    };

    const onOptionClick = (_option: string , id: string) => {
        console.log(id);
        setFactId(id);
        setEvidDialogOpen(true);
    };

    return (
        <Box sx={eventListSyle}>
            <CreateEvidenceDialog open={evidDialogOpen} onHandleClose={() => setEvidDialogOpen(false)} factID={factId} />
            <Button variant="contained" onClick={handleClickOpen}>Створити Факт</Button>
            <CreateFactDialog open={open} onHandleClose={handleClose} />
            <List sx={eventListSyle}>
            {items?.map((item, index) => (
                    <ExpandableListItem key={item.id + index}
                        menuOptions={{options, onOptionClick: (option) => onOptionClick(option, item.id)}}
                        descriptionChilds={<EvidenceListItem key={item.id + index} factId={item.id}/>}
                        onExpanded={() => onExpandedHandle(item.id)}
                    >
                        <ListItemText primary={item.title} primaryTypographyProps={{ sx: primaryTextStyles }}/>
                        <ListItemText primary={item.location.toString()} primaryTypographyProps={{ sx: primaryTextStyles }}/>
                        <ListItemText primary={item.description.toString()} primaryTypographyProps={{ sx: primaryTextStyles }}/>
                    </ExpandableListItem>
                ))}
            </List>
        </Box>);
};

export default Facts;