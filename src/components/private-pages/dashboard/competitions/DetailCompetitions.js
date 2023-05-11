import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Box from "@mui/material/Box";
import Drawer from "../../../../navs/Drawer";
import {Container} from "@material-ui/core";
import DrawerHeader from "../../../../navs/DrawerHeader";
import {MDBContainer} from "mdb-react-ui-kit";
import Typography from "@mui/material/Typography";
import {endpoints, getEndpointById} from "../../../../api/Urls";
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {getCountryFlag, GetGenderFlags, handleMouseEnter, handleMouseLeave} from "../utils/Utils";
import ShareLocationOutlinedIcon from '@mui/icons-material/ShareLocationOutlined';
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import moment from 'moment';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import {Spinner} from "react-bootstrap";

function DetailCompetitions() {
    const [data, setData] = useState(null);
    const {id} = useParams();
    const [showSpinner, setShowSpinner] = useState(true);

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    useEffect(() => {
        //competitionsByIdApi();

        axios.get(getEndpointById("competitions", id), {
            headers: {
                'Authorization': `Token ${usuarioSalvo.token}`
            }
        }).then(response => {
            setData(response.data);
        }).catch(error => {
            console.error(error);
        });

        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 3000); // Tempo limite de 3 segundos

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="sdd">
            <Box sx={{display: "flex"}}>
                <Drawer/>
                <Container id="marginDrawerHeader">
                    <DrawerHeader/>
                    <MDBContainer className="p-1 my-2">

                        <Typography variant="h6" fontWeight="bold" className="my-3 pb-0" style={{
                            fontSize: '20px'
                        }}>Competition details</Typography>

                        {data && (
                            <Typography id="margin3" variant="h6" fontWeight="bold" style={{
                                fontSize: '16px'
                            }}>{getCountryFlag(data.organizing_country)} {data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase()} </Typography>
                        )}

                        {data && (
                            <Typography id="margin3" variant="h6" fontWeight="bold" style={{
                                fontSize: '16px'
                            }}><CalendarMonthOutlinedIcon/> {moment(data.beginning_date).format('DD/MM/YYYY')} <WatchLaterOutlinedIcon/> {moment(data.beginning_date).format('HH:mm')}
                            </Typography>
                        )}

                        {data && (
                            <Typography id="margin3" variant="h6" fontWeight="bold" style={{
                                fontSize: '16px'
                            }}><CalendarMonthOutlinedIcon/> {moment(data.end_date).format('DD/MM/YYYY')} <WatchLaterOutlinedIcon/> {moment(data.end_date).format('HH:mm')}
                            </Typography>
                        )}

                        {data && (
                            <Typography id="margin3" variant="h6" fontWeight="bold" style={{
                                fontSize: '16px'
                            }}><AutoAwesomeMotionOutlinedIcon/> {data.discipline.charAt(0).toUpperCase() + data.discipline.slice(1).toLowerCase()}
                            </Typography>
                        )}

                        {data && (
                            <Typography id="margin5" variant="h6" fontWeight="bold" style={{
                                fontSize: '16px'
                            }}><ShareLocationOutlinedIcon/> {data.venue.charAt(0).toUpperCase() + data.venue.slice(1).toLowerCase()}
                            </Typography>
                        )}

                        {data && (
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>

                                    <Typography variant="h6" id="margin4" fontWeight="bold" style={{
                                        fontSize: '16px'
                                    }}>Events</Typography>

                                    {data.events.length === 0 && showSpinner &&
                                        (
                                            <div align="left">
                                                <Spinner id="load" animation="border" variant="secondary" size="3rem"/>
                                                <p id="load2">Loading...</p>
                                            </div>
                                        )
                                    }

                                    {data.events.length === 0 && !showSpinner && (

                                        <div align="left">
                                            <p id="error2">There are no events at the moment!</p>
                                        </div>
                                    )
                                    }

                                    {data.events.length !== 0 && (
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell id="esconde">Event class</TableCell>
                                                        <TableCell>Rounds</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data.events.map((item) => (
                                                        <TableRow key={item.id} onMouseEnter={handleMouseEnter}
                                                                  onMouseLeave={handleMouseLeave}>
                                                            <TableCell>{item.name}</TableCell>
                                                            <TableCell id="esconde">{item.event_class.charAt(0).toUpperCase() + item.event_class.slice(1).toLowerCase()}</TableCell>
                                                            <TableCell>{item.rounds}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )}

                                </Grid>

                                {/* Tabela 2 */}
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" id="margin4" fontWeight="bold" style={{
                                        fontSize: '16px'
                                    }}>Officials</Typography>

                                    {data.officials.length === 0 && showSpinner &&
                                        (
                                            <div align="left">
                                                <Spinner id="load" animation="border" variant="secondary" size="3rem"/>
                                                <p id="load2">Loading...</p>
                                            </div>
                                        )
                                    }

                                    {data.officials.length === 0 && !showSpinner && (
                                        <div align="left">
                                            <p id="error2">There are no officials at the moment!</p>
                                        </div>
                                    )
                                    }

                                    {data.officials.length !== 0 && (

                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell>Position</TableCell>
                                                        <TableCell id="esconde">Qualification</TableCell>
                                                        <TableCell id="esconde">Country</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data.officials.map((item) => (
                                                        <TableRow key={item.id} onMouseEnter={handleMouseEnter}
                                                                  onMouseLeave={handleMouseLeave}>
                                                            <TableCell>{item.first_name} {item.last_name}</TableCell>
                                                            <TableCell>{item.position.charAt(0).toUpperCase() + item.position.slice(1).toLowerCase()}</TableCell>
                                                            <TableCell id="esconde">{item.qualification}</TableCell>
                                                            <TableCell id="esconde">{getCountryFlag(item.country)}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )}
                                </Grid>

                                {/* Tabela 3 */}
                                <Grid item xs={12} md={12}>
                                    <Typography variant="h6" id="margin4" fontWeight="bold" style={{
                                        fontSize: '16px'
                                    }}>Athletes</Typography>

                                    {data.athletes.length === 0 && showSpinner &&
                                        (
                                            <div align="left">
                                                <Spinner id="load" animation="border" variant="secondary" size="3rem"/>
                                                <p id="load2">Loading...</p>
                                            </div>
                                        )
                                    }

                                    {data.athletes.length === 0 && !showSpinner && (
                                        <div align="left">
                                            <p id="error2">There are no athletes at the moment!</p>
                                        </div>
                                    )
                                    }

                                    {data.athletes.length !== 0 && (

                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Nome</TableCell>
                                                    <TableCell>Gender</TableCell>
                                                    <TableCell id="esconde">Country</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data.athletes.map((item) => (
                                                    <TableRow key={item.id} onMouseEnter={handleMouseEnter}
                                                              onMouseLeave={handleMouseLeave}>
                                                        <TableCell>{item.first_name} {item.last_name}</TableCell>
                                                        <TableCell>{GetGenderFlags(item.gender)}</TableCell>
                                                        <TableCell id="esconde">{getCountryFlag(item.country)}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    )}
                                </Grid>
                            </Grid>
                        )}

                    </MDBContainer>
                </Container>
            </Box>
        </div>
    );
}

export default DetailCompetitions;
