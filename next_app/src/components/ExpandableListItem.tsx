'use client';

import React, { useState, ReactNode, SetStateAction } from 'react';
import { ListItem, Collapse } from '@mui/material';

import { ItemMenu } from './ItemMenu'
import { listItemStyles } from '../app/styles'
import { ItemMenuProps } from './ItemMenu';

export interface IExpandableListItemProps {
  menuOptions?: ItemMenuProps;
  children: ReactNode;
  descriptionChilds?: ReactNode;
  onExpanded?: () => void;
};

export const ExpandableListItem: React.FC<IExpandableListItemProps> = (
  { 
    children,
    menuOptions,
    descriptionChilds,
    onExpanded
  }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
    if (expanded && onExpanded)
      onExpanded();
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <ListItem onClick={handleToggle} sx={listItemStyles} >
          {children}
        </ListItem>
        {menuOptions && <ItemMenu options={menuOptions?.options} onOptionClick={menuOptions?.onOptionClick} />}
      </div>
      {descriptionChilds &&
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {descriptionChilds}
        </Collapse>
      }
    </div>
  );
}
