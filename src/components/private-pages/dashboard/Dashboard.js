import Drawer from "../../../navs/Drawer";
import Box from "@mui/material/Box";
import {useNavigate} from 'react-router-dom';
import {Container} from "@material-ui/core";
import {MDBContainer} from "mdb-react-ui-kit";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Grid,
    Button, IconButton
} from '@mui/material';
import {Spinner} from "react-bootstrap";
import Typography from '@mui/material/Typography';
import DrawerHeader from "../../../navs/DrawerHeader";
import {endpoints} from "../../../api/Urls";
import {getCountryFlag, handleMouseEnter, handleMouseLeave} from "./utils/Utils";
import Tooltip from "@mui/material/Tooltip";
import WarningIcon from "@mui/icons-material/Warning";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Delete as DeleteIcon, Edit as EditIcon} from "@mui/icons-material";

const Dashboard = () => {

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const navigate = useNavigate();
    const [showSpinner, setShowSpinner] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const isMobile = useMediaQuery('(max-width: 600px)');
    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())
        || item.venue.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        axios.get(endpoints.competitions, {
            headers: {
                'Authorization': `Token ${usuarioSalvo.token}`
            }
        }).then(response => {
            const sortedData = response.data.results.sort((a, b) =>
                a.organizing_country.localeCompare(b.organizing_country)
            );
            setData(sortedData);
        }).catch(error => {
            console.error(error);
        });

        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 3000); // Tempo limite de 3 segundos

        return () => clearTimeout(timer);
    }, []);
    const handleDetalhesClick = (id) => {
        navigate(`/login/dashboard/${id}`);
    };
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleOpenDialog = () => {
        console.log("create competition")
    }
    const handleOpenEditDialog = () => {
        console.log("Edit competition")
    }
    const handleClickOpenDelete = () => {
        console.log("Delete competition")
    }

    return (
        <div className="sdd">
            <Box sx={{display: "flex"}}>
                <Drawer/>
                <Container id="marginDrawerHeader">
                    <DrawerHeader/>
                    <MDBContainer className="p-1 my-2">

                        <Typography variant="h6" fontWeight="bold" className="my-3 pb-2" style={{
                            fontSize: '20px'
                        }}>
                            Welcome, <span id="nameUser">{usuarioSalvo.username}!</span>
                        </Typography>

                        <Typography id="margin2">
                            Here you can see all the competitions that are currently available. Click on the competition
                            to see more details.
                        </Typography>

                        {data.length === 0 && showSpinner &&
                            (
                                <div align="center">
                                    <Spinner id="load" animation="border" variant="secondary" size="3rem"/>
                                    <p id="load2">Loading...</p>
                                </div>
                            )
                        }

                        {data.length === 0 && !showSpinner && (
                            <div align="center">
                                <WarningIcon style={{color: 'red', marginTop: '3vh'}}/>
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
                                        sx={{width: '100%', margin: '0 0 1rem'}}
                                    />

                                    {isMobile ? (
                                        <Grid item xs={12} sm={12}>
                                            <Button
                                                variant="contained"
                                                startIcon={<AddIcon/>}
                                                onClick={handleOpenDialog}
                                                style={{textTransform: 'none', color: 'success', marginBottom: '3vh'}}
                                                sx={{width: '100%', maxWidth: '100%'}}
                                            >
                                                Create competition
                                            </Button>
                                        </Grid>
                                    ) : (
                                        <Grid item xs={12} sm={12} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                            <Button variant="contained" startIcon={<AddIcon/>}
                                                    onClick={handleOpenDialog}
                                                    style={{
                                                        textTransform: 'none',
                                                        color: 'success',
                                                        marginBottom: '1vh'
                                                    }}>
                                                Create competition
                                            </Button>
                                        </Grid>
                                    )}

                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Country</TableCell>
                                                    <TableCell>Venue</TableCell>
                                                    <TableCell id="esconde">Name</TableCell>
                                                    <TableCell id="esconde">Discipline</TableCell>
                                                    <TableCell>Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {filteredData.length > 0 && filteredData.map((item) => (
                                                    <TableRow key={item.id} style={{cursor: 'pointer'}}
                                                              onClick={() => handleDetalhesClick(item.id)}
                                                              onMouseEnter={handleMouseEnter}
                                                              onMouseLeave={handleMouseLeave}>
                                                        <TableCell>
                                                            <Tooltip title={item.organizing_country.toUpperCase()}>
                                                                {getCountryFlag(item.organizing_country)}
                                                            </Tooltip>
                                                        </TableCell>
                                                        <TableCell>{item.venue.charAt(0).toUpperCase() + item.venue.slice(1).toLowerCase()}</TableCell>
                                                        <TableCell id="esconde">
                                                            {item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase().trim()}
                                                        </TableCell>
                                                        <TableCell id="esconde" style={{padding: -30}}>
                                                            {item.discipline.charAt(0).toUpperCase() + item.discipline.slice(1).toLowerCase()}
                                                        </TableCell>
                                                        <TableCell style={{padding: -30}}>
                                                            <Tooltip title="Edit" className="tooltip-gender">
                                                                <IconButton onClick={(event) => {event.stopPropagation();handleOpenEditDialog();}}>
                                                                    <EditIcon color="gray" style={{cursor: 'pointer'}}/>
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Remove" className="tooltip-gender">
                                                                <IconButton onClick={(event) => {event.stopPropagation();handleClickOpenDelete();}}>
                                                                    <DeleteIcon color="error" style={{cursor: 'pointer'}}/>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}

                                                {filteredData.length === 0 &&
                                                    <TableRow onMouseEnter={handleMouseEnter}
                                                              onMouseLeave={handleMouseLeave}>
                                                        <TableCell colSpan={4} id="error2" align="left"> Competition not
                                                            found!</TableCell>
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
