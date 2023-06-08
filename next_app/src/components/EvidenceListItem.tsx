'use client';

import { List, ListItemText, ListItem, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { EvaluationType, Evidence, EvidenceType, Evaluation } from '@/common/types';

import {
        primaryTextStyles,
        evidenceListSyle,
        evidenceListItemStyles
    } from '../app/styles'
import { createEvaluation, fetchEvaluations, fetchEvidences } from '@/common/programUtils';
import { useDataContext } from '../app/Context/store'; 

const TIMER = 60000;

interface EvidenceListItemProps {
    factId: string;
};

export const EvidenceListItem: React.FC<EvidenceListItemProps> = ({factId}) => {
    const evidenceBorder = (type: EvidenceType) => type === EvidenceType.Proof ? '2px solid green' : ' 2px solid red'; 
    const [loading, setLoading] = useState(true);
    const [evidences, setEvidences] = useState<Evidence[]>();
    const [evaluation, setEvaluation] = useState(new Map<string, Evaluation>);

    const { sharedState } = useDataContext();

    const downloadEvaluations = () => {
        const { program, wallet, associationName } = sharedState;
        if (!program || !wallet || !associationName) return;

        evidences?.forEach((e) => {
            fetchEvaluations(program, associationName, e.id, factId).then((evl) => {
                const newMap = evaluation;
                newMap?.set(e.id, evl);
                setEvaluation(newMap);
            }, (e) => console.error(e));
        })
    };

    const downloadEvidences = () => {
        const { program, associationName } = sharedState;
        if (!program || !associationName) return;
    
        fetchEvidences(program, associationName, factId).then((evs) => {
            setLoading(false);
            setEvidences(evs);
        }, (e) => console.error(e));
    };

    useEffect(() => {
        downloadEvaluations();
    }, [evidences]);

    useEffect(() => {
        downloadEvidences();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setLoading(true);
            downloadEvidences();
        }, TIMER);

        return () => clearInterval(interval);
    });

    const onEvaluationHandle = (type: EvaluationType, id: string) => {
        const { program, wallet, associationName } = sharedState;
        if (!program || !wallet || !associationName) return;

        createEvaluation(program, associationName, id, wallet.publicKey, factId, type)
            .catch((e) => console.error(e));
    };

    return (
        <div>
            <List sx={evidenceListSyle}>
                { loading && < CircularProgress />}
                { !loading && evidences &&
                    evidences.map((e, index) => (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                            <ListItem key={e.id}
                                sx={{...evidenceListItemStyles, border: evidenceBorder(e.evidenceType)}}
                            >
                                <ListItemText 
                                    primary={e.evidenceType as string}
                                    sx={primaryTextStyles}/
                                >
                                <ListItemText primary={e.reporter} sx={primaryTextStyles}/>
                                <div>
                                    <ListItemText primary={e.description}/>
                                </div>
                            </ListItem>
                            <IconButton onClick={() => onEvaluationHandle(EvaluationType.Like, e.id)}>
                                <ThumbUpIcon sx={{paddingRight: '7px'}}/>
                                {evaluation && evaluation.has(e.id) && <>{evaluation.get(e.id)?.likes}</>}
                            </IconButton>
                            <IconButton onClick={() => onEvaluationHandle(EvaluationType.Dislike, e.id)}>
                                <ThumbDownIcon sx={{paddingRight: '7px'}}/>
                                {evaluation && evaluation.has(e.id) && <>{evaluation.get(e.id)?.dislikes}</>}
                            </IconButton>
                        </div>
                    ))
                }
            </List>
        </div>
    )
};
