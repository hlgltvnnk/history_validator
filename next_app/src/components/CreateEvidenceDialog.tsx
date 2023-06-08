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
import TextareaAutosize from '@mui/base/TextareaAutosize';

import { useState } from 'react';

import { dialogBoxStyle, dialogTextFieldStyle } from '../app/styles'
import { useDataContext } from '../app/Context/store'
import { EvidenceType } from "@/common/types";
import { createEvidence, Status } from "@/common/programUtils";
import { IEvidenceDialogProps } from "@/common/types";


const CreateEvidenceDialog: React.FC<IEvidenceDialogProps> = ({ open, onHandleClose, factID }) => {
    const [evidenceType, setEvidenceType] = useState<EvidenceType>(EvidenceType.None);

    const [description, setDescription] = useState('');

    const handleChangeType = (event: SelectChangeEvent) => {
        setEvidenceType(event.target.value as EvidenceType);
    };

    const { sharedState } = useDataContext();
    
    const onCreateevidenceHandle = () => {
        const { program, wallet } = sharedState;
        const association = localStorage.getItem("association");
        if (!association || !program || !wallet)
            throw new Error("Association not exist");

        createEvidence(program, association, wallet.publicKey, factID,
            evidenceType, description).then((status) => {
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
                    Додати доказ
                    <IconButton sx={{
                        justifySelf: 'flex-end'
                    }} color="primary" onClick={onHandleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton></DialogTitle>
                <Box sx={dialogTextFieldStyle}>
                <TextareaAutosize
                        id="outlined-Reporter-address"
                        placeholder="Опис події"
                        value={description}
                        maxLength={Number(2048)}
                        style={{minWidth: 400, minHeight: 60}}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Box>
                <Box>
                    <FormControl sx={{ m: 1, minWidth: 220, }} size="small">
                        <InputLabel id="demo-select-evidence-type">Тип доказу</InputLabel>
                        <Select
                            labelId="demo-select-evidence-type"
                            id="demo-evidence-type"
                            value={evidenceType}
                            label="Тип доказу"
                            onChange={handleChangeType}
                        >
                            <MenuItem value={EvidenceType.Proof}>Доведення</MenuItem>
                            <MenuItem value={EvidenceType.Refutation}>Спростування</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ marginBottom: '25px', marginTop: '30px' }}>
                    <Button variant="contained" onClick={onCreateevidenceHandle}>Create</Button>
                </Box>
            </Box>
        </Dialog>);
};

export default CreateEvidenceDialog;
