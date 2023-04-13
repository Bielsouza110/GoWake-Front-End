import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TableEvent from "./TableEvent";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function GridTable() {

    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                    <Item>
                        <Typography
                            variant="h6"
                            noWrap
                            id="tCards"
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.0rem',
                                color: '#808080',
                                textDecoration: 'none',
                                alignItems: 'center'
                            }}
                        >
                            Category Junior
                        </Typography>
                    <TableEvent/>
                    <Button variant="secondary" onClick={() => navigate("/")} className="mb-3 w-100" id="btn">View details</Button>
                    </Item>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Item>
                        <Typography
                            variant="h6"
                            noWrap
                            id="tCards"
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.0rem',
                                color: '#808080',
                                textDecoration: 'none',
                                alignItems: 'center'
                            }}
                        >
                            Category Master
                        </Typography>
                        <TableEvent/>
                        <Button variant="secondary" onClick={() => navigate("/")} className="mb-3 w-100" id="btn">View details</Button>
                    </Item>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Item>
                        <Typography
                            variant="h6"
                            noWrap
                            id="tCards"
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.0rem',
                                color: '#808080',
                                textDecoration: 'none',
                                alignItems: 'center'
                            }}
                        >
                            Category Veteran
                        </Typography>
                        <TableEvent/>
                        <Button variant="secondary" onClick={() => navigate("/")} className="mb-3 w-100" id="btn">View details</Button>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}