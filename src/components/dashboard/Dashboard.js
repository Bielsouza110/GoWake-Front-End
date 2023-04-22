import Drawer from "../../navs/Drawer";
import Box from "@mui/material/Box";
import {useNavigate} from 'react-router-dom';
import {Container} from "@material-ui/core";
import {MDBContainer} from "mdb-react-ui-kit";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField} from '@mui/material';
import {Spinner} from "react-bootstrap";
import Typography from '@mui/material/Typography';
import DrawerHeader from "../../navs/DrawerHeader";
import {endpoints} from "../../api/Urls";

const Dashboard = () => {

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const navigate = useNavigate();
   // const token2 = '818f3287afd55fdcbc86d21cc55e068b62cffa18';

    const [data, setData] = useState([]);
    const competitionsApi = async () => {
        try {
            const response = await axios.get(endpoints.competitions, {
                headers: {
                    'Authorization': `Token ${usuarioSalvo.token}`
                }
            });
            console.log(response.data.results);
            setData(response.data.results);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        competitionsApi();

        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 3000); // Tempo limite de 3 segundos

        return () => clearTimeout(timer);
    });

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

    const [showSpinner, setShowSpinner] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="sdd">
            <Box sx={{display: "flex"}}>
                <Drawer/>
                <Container id="marginDrawerHeader" >
                    <DrawerHeader/>
                    <MDBContainer className="p-1 my-2">

                        <Typography variant="h6" fontWeight="bold" className="my-3 pb-2" style={{
                            fontSize: '20px'
                        }}>
                            Welcome, <span id="nameUser">{usuarioSalvo.username}!</span>
                        </Typography>

                        <Typography id="margin2">
                            Here you can see all the competitions that are currently available. Click on the competition to see more details.
                        </Typography>

                        {data.length === 0 && showSpinner &&
                            (
                                <div align="left">
                                    <Spinner id="load" animation="border" variant="secondary" size="3rem"/>
                                    <p id="load2">Loading...</p>
                                </div>
                            )
                        }

                        {data.length === 0 && !showSpinner && (

                            <div align="left">
                                <p id="error2">There are no competitions at the moment!</p>
                            </div>
                            )
                        }

                        {data.length !== 0 && (
                            <div>
                                <div>
                                    <TextField
                                        label="Search by competition name"
                                        variant="outlined"
                                        value={searchTerm}
                                        onChange={handleSearchTermChange}
                                        size="large"
                                        sx={{ width: '100%', margin: '0 0 1rem'}}
                                    />
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
                                                {filteredData.length > 0 && filteredData.map((item) => (
                                                    <TableRow key={item.id} onClick={() => handleDetalhesClick(item.id)}
                                                              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                                        <TableCell>{getCountryFlag(item.organizing_country)}</TableCell>
                                                        <TableCell>{item.venue.charAt(0).toUpperCase() + item.venue.slice(1).toLowerCase()}</TableCell>
                                                        <TableCell>{item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}</TableCell>
                                                        <TableCell id="esconde">{item.discipline.charAt(0).toUpperCase() + item.discipline.slice(1).toLowerCase()}</TableCell>
                                                    </TableRow>
                                                ))}

                                                {filteredData.length === 0 &&
                                                    <TableRow onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                                        <TableCell colSpan={4} id="error2" align="left"> Competition not found!</TableCell>
                                                    </TableRow>
                                                }

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        )}


                    </MDBContainer>
                </Container>
            </Box>
        </div>
    );
}

export default Dashboard;
