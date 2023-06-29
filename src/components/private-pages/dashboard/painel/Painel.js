import React from 'react';
import { Grid, Card, CardContent } from '@mui/material';
import Typography from "@mui/material/Typography";
import Diversity3TwoToneIcon from '@mui/icons-material/Diversity3TwoTone';
import KitesurfingTwoToneIcon from "@mui/icons-material/KitesurfingTwoTone";
import EventIcon from '@mui/icons-material/Event';
import FestivalIcon from "@mui/icons-material/Festival";
const Painel = ({nComp, nEvents, nAthletes, nOfficials}) => {

    return (
        <div style={{ marginBottom: '5vh', marginTop: '3.5vh' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ height: '10vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FestivalIcon style={{ fontSize: 50 }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                                <Typography variant="h6" style={{ fontSize: '15px', fontWeight: 'bold', marginRight: '5px' }}>
                                    {nComp}
                                </Typography>
                                <Typography variant="body1" style={{ fontSize: '15px', fontStyle: 'italic' }}>
                                    Competitions
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ height: '10vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <EventIcon style={{ fontSize: 50 }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                                <Typography variant="h6" style={{ fontSize: '15px', fontWeight: 'bold', marginRight: '5px' }}>
                                    {nEvents}
                                </Typography>
                                <Typography variant="body1" style={{ fontSize: '15px', fontStyle: 'italic' }}>
                                    Events
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ height: '10vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <KitesurfingTwoToneIcon style={{ fontSize: 50 }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                                <Typography variant="h6" style={{ fontSize: '15px', fontWeight: 'bold', marginRight: '5px' }}>
                                    {nAthletes}
                                </Typography>
                                <Typography variant="body1" style={{ fontSize: '15px', fontStyle: 'italic' }}>
                                    Athletes
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ height: '10vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Diversity3TwoToneIcon style={{ fontSize: 50 }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                                <Typography variant="h6" style={{ fontSize: '15px', fontWeight: 'bold', marginRight: '5px' }}>
                                    {nOfficials}
                                </Typography>
                                <Typography variant="body1" style={{ fontSize: '15px', fontStyle: 'italic' }}>
                                    Officials
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Painel;
