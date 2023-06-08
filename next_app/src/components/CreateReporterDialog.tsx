'use client';

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { MenuItem, Button } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { useState } from 'react';

import { dialogBoxStyle, dialogTextFieldStyle } from '../app/styles'
import { useDataContext } from '../app/Context/store'
import { ReporterRank } from "@/common/types";
import { createReporter, Status } from "@/common/programUtils";
import { IDialogProps } from "@/common/types";


const CreateReporterDialog: React.FC<IDialogProps> = ({ open, onHandleClose }) => {
    const [reporterType, setReporterType] = useState<ReporterRank>(ReporterRank.Empty);

    const [reporterName, setReporterName] = useState('');

    const [reporterAddress, setReporterAddress] = useState('');

    const handleChangeType = (event: SelectChangeEvent) => {
        setReporterType(event.target.value as ReporterRank);
    };

    const { sharedState } = useDataContext();
    
    const onCreateReporterHandle = () => {
        console.log("onCreateReporterHandle: ");
        console.log(sharedState)
        const { program } = sharedState;
        const association = localStorage.getItem("association");
        if (!association || !program)
            throw new Error("Association not exist");

        createReporter(program, association, reporterAddress, reporterName, reporterType).then((status) => {
            if (status.status == Status.OK)
                onHandleClose();
            // TODO: handle errors
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
                    Додати репортера
                    <IconButton sx={{
                        justifySelf: 'flex-end'
                    }} color="primary" onClick={onHandleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton></DialogTitle>
                <Box sx={dialogTextFieldStyle}>
                    <TextField
                        id="outlined-Reporter-name"
                        label="Ім'я репортера"
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                    />
                </Box>
                <Box sx={dialogTextFieldStyle}>
                    <TextField
                        id="outlined-Reporter-address"
                        label="Адреса репортера"
                        value={reporterAddress}
                        onChange={(e) => setReporterAddress(e.target.value)}
                    />
                </Box>
                <Box>
                    <FormControl sx={{ m: 1, minWidth: 220, }} size="small">
                        <InputLabel id="demo-select-reporter-type">Reporter Type</InputLabel>
                        <Select
                            labelId="demo-select-reporter-type"
                            id="demo-reporter-type"
                            value={reporterType}
                            label="Тип репортера"
                            onChange={handleChangeType}
                        >
                            <MenuItem value={ReporterRank.Validator}>Validator</MenuItem>
                            <MenuItem value={ReporterRank.Connoisseur}>Connoisseur</MenuItem>
                            <MenuItem value={ReporterRank.Expert}>Expert</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ marginBottom: '25px', marginTop: '30px' }}>
                    <Button variant="contained" onClick={onCreateReporterHandle}>Create</Button>
                </Box>
            </Box>
        </Dialog>);
};

export default CreateReporterDialog;
