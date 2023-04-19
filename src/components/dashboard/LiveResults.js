import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from "./Drawer";

const LiveResults = () => {

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    return (
        <div className="sdd">
        <Box sx ={{display:"flex"}}>
            <Drawer/>
            <Box component="main" sx={{ flexGrow: 1, p: 3, margin:0 }}>
                <DrawerHeader />
                <Typography paragraph>
                    Page Live Results
                </Typography>
            </Box>
        </Box>
        </div>
    );
};

export default LiveResults;