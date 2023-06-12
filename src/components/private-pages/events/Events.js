import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from "../../../navs/Drawer";
import DrawerHeader from "../../../navs/DrawerHeader";
import {Container} from "@material-ui/core";
import {MDBContainer} from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import EventsAthletes from "./events-athletes/EventsAthletes";
import EventsCompetitions from "./events-competitons/EventsCompetitions"

const Events = () => {

    const [botaoAtivo, setBotaoAtivo] = useState('botao1');

    const handleBotao1Click = () => {
        setBotaoAtivo('botao1');
    };

    const handleBotao2Click = () => {
        setBotaoAtivo('botao2');
    };

    return (
        <div className="sdd">
            <Box sx={{display: "flex"}}>
                <Drawer/>
                <Container id="marginDrawerHeader">
                    <DrawerHeader/>
                    <MDBContainer className="p-1 my-2">
                        <Typography variant="h6" fontWeight="bold" className="my-3 pb-0" style={{
                            fontSize: '20px'
                        }}>Events</Typography>

                      {/*  <Grid item xs={12} sm={12} sx={{display: 'flex', justifyContent: 'flex-start'}}>
                            <Button
                                variant="contained"
                                color={botaoAtivo === 'botao1' ? 'success' : 'primary'}
                                onClick={handleBotao1Click}
                                disabled={botaoAtivo === 'botao1'}
                                style={{textTransform: 'none', color: 'success', marginBottom: '1vh'}}>

                                Athletes

                            </Button>

                            <Button
                                variant="contained"
                                color={botaoAtivo === 'botao2' ? 'success' : 'primary'}
                                onClick={handleBotao2Click}
                                disabled={botaoAtivo === 'botao2'}
                                style={{textTransform: 'none', color: 'success', marginBottom: '1vh'}}>

                                Competitions

                            </Button>

                        </Grid>

                        {botaoAtivo === 'botao1' ? (
                            <form>
                                <EventsAthletes/>
                            </form>
                        ) : (
                            <form>
                                <EventsCompetitions/>
                            </form>
                        )
                        }*/}
                    </MDBContainer>
                </Container>
            </Box>
        </div>
    );
};

export default Events;