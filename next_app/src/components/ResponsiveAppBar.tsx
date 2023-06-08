'use client';

import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import { useDataContext } from '@/app/Context/store';

const pages = ['Reporters', 'Events', 'Facts'];

const ResponsiveAppBar: React.FC = () => {
  const { appInit } = useDataContext();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Box sx={{ marginRight: 5, alignItems: 'center', display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            <img style={{ maxBlockSize: '30px', }} src="Ionic-Ionicons-Book.svg" alt="logo" className={'logoBook'} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link href="/" style={{textDecoration: 'none', color: 'whitesmoke'}}>
              History Validator
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Box>
              {appInit&& <Link href="/Reporters" color="secondary">
                <Button sx={{ margingRight: '10px' }} variant="contained">Reporters</Button>
              </Link>}
            </Box>

            <Box>
              {appInit && <Link href="/Events" color="secondary">
                <Button sx={{ margingRight: '10px' }} variant="contained">Events</Button>
              </Link>}
            </Box>

            <Box>
              {appInit && <Link href="/Facts" color="secondary">
                <Button sx={{ margingRight: '10px' }} variant="contained">Facts</Button>
              </Link>}
            </Box>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
