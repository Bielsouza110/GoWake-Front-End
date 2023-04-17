import Drawer from "./Drawer";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Cards from "../home/Cards";
import DemoCarousel from "../home/DemoCarousel";
import {useLocation, useNavigate} from 'react-router-dom';
import {Container} from "@material-ui/core";
import {MDBContainer} from "mdb-react-ui-kit";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DownloadingTwoToneIcon from "@mui/icons-material/DownloadingTwoTone";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import FlagIcon from 'react-flags-select';

function Dashboard() {

    const navigate = useNavigate();
    const location = useLocation();
    const objetoComState = location.state || null;
    const nome = objetoComState?.username || 'Nome não fornecido';
    const email = objetoComState?.email || 'Email não fornecido';
    const token = objetoComState?.token || 'Token não fornecido';

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const token2 = '818f3287afd55fdcbc86d21cc55e068b62cffa18';

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://mmonteiro.pythonanywhere.com/api/competitions/', {
                headers: {
                    'Authorization': `Token ${token2}`
                }
            });

            console.log(response.data.results);

            setData(response.data.results);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDetalhesClick = (id) => {
        navigate(`/login/dashboard/${id}`);
    };

    const handleMouseEnter = (event) => {
        event.currentTarget.style.backgroundColor = '#eee';
    };

    const handleMouseLeave = (event) => {
        event.currentTarget.style.backgroundColor = '';
    };

    const countryFlags = {
        PT: '🇵🇹', BRZ: '🇧🇷', ESP: '🇪🇸',
        FRA: '🇫🇷', ITA: '🇮🇹', GER: '🇩🇪',
        AUS: '🇦🇺', NED: '🇳🇱', GBR: '🇬🇧',
        USA: '🇺🇸', CAN: '🇨🇦', JPN: '🇯🇵',
        CHN: '🇨🇳', KOR: '🇰🇷', RUS: '🇷🇺',
        SWE: '🇸🇪', NOR: '🇳🇴', FIN: '🇫🇮',
        DEN: '🇩🇰', CZE: '🇨🇿', POL: '🇵🇱',
        HUN: '🇭🇺', AUT: '🇦🇹', SUI: '🇨🇭',
        BEL: '🇧🇪', IRL: '🇮🇪', POR: '🇵🇹',
        ARG: '🇦🇷', MEX: '🇲🇽', COL: '🇨🇴',
    };

    function getCountryFlag(countryCode) {
        const flag = countryFlags[countryCode];
        return flag || countryCode;
    }

    return (
        <div className="sdd">
            <Box sx={{display: "flex"}}>
                <Drawer/>
                <Container>
                    <DrawerHeader/>
                    <MDBContainer className="p-1 my-2">

                        <h5 className="fw-normal my-3 pb-2" style={{
                            letterSpacing: '1px', fontSize: '30px'
                        }}>Dashboard</h5>

{/*                        <Typography id="margin" variant="h6">
                            Applicability
                        </Typography>*/}

{/*                        <div id="margin">
                            {data.map(item => (
                                <p key={item.id}>{item.name}</p>
                            ))}
                        </div>*/}

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Country</TableCell>
                                        <TableCell>Venue</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell id="esconde">Discipline</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map(dado => (
                                        <TableRow key={dado.id} onClick={() => handleDetalhesClick(dado.id)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                            <TableCell>{getCountryFlag(dado.organizing_country)}</TableCell>
                                            <TableCell>{dado.venue.charAt(0).toUpperCase() + dado.venue.slice(1).toLowerCase()}</TableCell>
                                            <TableCell>{dado.name.charAt(0).toUpperCase() + dado.name.slice(1).toLowerCase()}</TableCell>
                                            <TableCell id="esconde">{dado.discipline.charAt(0).toUpperCase() + dado.discipline.slice(1).toLowerCase()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </MDBContainer>
                </Container>
            </Box>
        </div>
    );
}

export default Dashboard;
