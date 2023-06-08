'use client';

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Box, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useState } from 'react';

import { dialogBoxStyle, dialogTextFieldStyle } from '../app/styles'
import { useDataContext } from '../app/Context/store'
import { createFact, Status } from "@/common/programUtils";
import { IFactDialogProps } from "@/common/types";

export const CreateFactDialog: React.FC<IFactDialogProps> = ({ open, onHandleClose, event }) => {
    const [timeFrom, setTimeFrom] = useState<Dayjs | null>(dayjs(''));
    const [timeTo, setTimeTo] = useState<Dayjs | null>(dayjs(''));

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    const { sharedState } = useDataContext();

    const onClose = () => {
        setTimeFrom(dayjs(''));
        setTimeTo(dayjs(''));
        setTitle('');
        setDescription('');
        setLocation('');

        onHandleClose();
    };

    const inputValid = () => {
        return timeFrom && title.length != 0 &&
            description.length != 0 && location.length != 0;
    };

    const onCreateEventHandle = () => {
        if (!inputValid() || !timeFrom)
            return;

        const { program, wallet } = sharedState;
        const association = localStorage.getItem("association");
        if (!association || !program || !wallet)
            throw new Error("Association or program not exist");

        createFact(program, association, wallet.publicKey,
            title, location, description, timeFrom.unix(), timeTo?.unix())
            .then(() => {
                onClose();
            }, (e) => {
                console.log(e);
            });
    };

    return (
        <Dialog open={open} onClose={onHandleClose}>
            <Box sx={dialogBoxStyle}>
                <DialogTitle sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '90%',
                    alignItems: 'center'
                }}>
                    Створити Факт
                    <IconButton sx={{
                        justifySelf: 'flex-end'
                    }} color="primary" onClick={onHandleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton></DialogTitle>
                <Box sx={dialogTextFieldStyle}>
                    <TextField
                        id="outlined-Reporter-name"
                        label="Назва факту"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Box>
                <Box sx={dialogTextFieldStyle}>
                    <TextField
                        id="outlined-Reporter-address"
                        label="Місце факту"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </Box>
                <Box sx={dialogTextFieldStyle}>
                    <TextareaAutosize
                        id="outlined-Reporter-address"
                        placeholder="Опис факту"
                        value={description}
                        maxLength={Number(2048)}
                        style={{minWidth: 400, minHeight: 60}}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Box>
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField', 'DateField']}>
                            <DateField
                                label="Початок факту"
                                value={timeFrom}
                                onChange={(newValue) => setTimeFrom(newValue)}
                            />
                            <DateField
                                label="Кінець факту"
                                value={timeTo}
                                onChange={(newValue) => setTimeTo(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Box>
                <Box sx={{ marginBottom: '25px', marginTop: '30px' }}>
                    <Button variant="contained" onClick={onCreateEventHandle}>Створити</Button>
                </Box>
            </Box>
        </Dialog>);
};

export default CreateFactDialog;
