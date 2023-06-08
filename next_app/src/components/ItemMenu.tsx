'use client';

import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface ItemMenuProps {
    options: string[];
    onOptionClick: (option: string) => void;
};

export const ItemMenu: React.FC<ItemMenuProps> = ({options, onOptionClick}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                { options.map((op) => 
                    <MenuItem key={op} onClick={() => { 
                            onOptionClick(op);
                            setAnchorEl(null);
                        }}
                    >
                        {op}
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
}
