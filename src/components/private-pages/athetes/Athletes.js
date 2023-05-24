import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from "../../../navs/Drawer";
import DrawerHeader from "../../../navs/DrawerHeader";
import {Container} from "@material-ui/core";
import {MDBContainer} from "mdb-react-ui-kit";
import {Spinner} from "react-bootstrap";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import {getCountryFlag, GetGenderFlags, handleMouseEnter, handleMouseLeave} from "../dashboard/utils/Utils";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {endpoints, getEndpointDeleteAthleteById} from "../../../api/Urls";
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/material/Tooltip";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreateAthlete from "./create/CreateAthlete";
import useMediaQuery from '@mui/material/useMediaQuery';

const Athletes = () => {

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [idAthlete, setIdAthlete] = useState('');
    const [showSpinner, setShowSpinner] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [dataCompetition, setDataCompetition] = useState([]);
    const filteredData = data.filter(item => item.first_name.toLowerCase().includes(searchTerm.toLowerCase())
        || item.last_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const reload = () => {
            axios.get(endpoints.competitions, {
                headers: {
                    'Authorization': `Token ${usuarioSalvo.token}`
                }
            }).then(response => {
                const uniqueAthletes = {};
                response.data.results.forEach((competition) => {
                    competition.athletes.forEach((athlete) => {
                        if (!uniqueAthletes[athlete.fed_id]) {
                            uniqueAthletes[athlete.fed_id] = athlete;
                        }
                    });
                });

                const uniqueAthletesArray = Object.values(uniqueAthletes);
                setData(uniqueAthletesArray);
                setDataCompetition(response.data.results);
            }).catch(error => {
                console.error(error);
            });

            const timer = setTimeout(() => {
                setShowSpinner(false);
            }, 3000); // Tempo limite de 3 segundos

            return () => clearTimeout(timer);
    }

    useEffect(() => {
        const fetchAtletes = async () => {
            axios.get(endpoints.competitions, {
                headers: {
                    'Authorization': `Token ${usuarioSalvo.token}`
                }
            }).then(response => {
                const uniqueAthletes = {};
                response.data.results.forEach((competition) => {
                    competition.athletes.forEach((athlete) => {
                        if (!uniqueAthletes[athlete.fed_id]) {
                            uniqueAthletes[athlete.fed_id] = athlete;
                        }
                    });
                });
                const uniqueAthletesArray = Object.values(uniqueAthletes);
                const sortedData = uniqueAthletesArray.sort((a, b) => a.fed_id.localeCompare(b.fed_id));
                setData(sortedData);
                setDataCompetition(response.data.results);
            }).catch(error => {
                console.error(error);
            });

            const timer = setTimeout(() => {
                setShowSpinner(false);
            }, 3000); // Tempo limite de 3 segundos

            return () => clearTimeout(timer);
        };

        fetchAtletes();
    }, []);


    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleDeleteAthlete = (idAthlete) => {

        const athleteId = idAthlete;

        const competitionIds = dataCompetition
            .filter(competition => competition.athletes.some(athlete => athlete.id === athleteId))
            .map(competition => competition.id);

       // console.log(competitionIds); // Output: [1, 3]

        competitionIds.forEach(competitionId => {
            axios.delete(getEndpointDeleteAthleteById("athlete", competitionId, idAthlete), {
                headers: {
                    'Authorization': `Token ${usuarioSalvo.token}`
                }
            }).then(response => {

                if (response.status === 204) {
                    axios.get(endpoints.competitions, {
                        headers: {
                            'Authorization': `Token ${usuarioSalvo.token}`
                        }
                    }).then(response => {

                        const uniqueAthletes = {};
                        response.data.results.forEach((competition) => {
                            competition.athletes.forEach((athlete) => {
                                if (!uniqueAthletes[athlete.fed_id]) {
                                    uniqueAthletes[athlete.fed_id] = athlete;
                                }
                            });
                        });

                        const uniqueAthletesArray = Object.values(uniqueAthletes);
                        setData(uniqueAthletesArray);

                        setDataCompetition(response.data.results);

                    }).catch(error => {
                        console.error(error);
                    });
                } else {
                    console.error(`Failed to delete athlete ${idAthlete} from competition ${competitionId}.`);
                    // Handle the error as needed.
                }
            }).catch(error => {
                console.error(error);
            });
        });
    };
    const handleClickOpen = (id) => {
        setIdAthlete(id);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = (item) => {
        handleDeleteAthlete(item)
        handleClose();
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [athletes, setAthletes] = useState([]);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        reload();
    };

    const handleCreateAthlete = (athlete) => {
        setAthletes([...athletes, athlete]);
    };

    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <div className="sdd">
            <Box sx={{display: "flex"}}>
                <Drawer/>
                <Container id="marginDrawerHeader" >
                    <DrawerHeader/>
                    <MDBContainer className="p-1 my-2">
                        <Typography variant="h6" fontWeight="bold" className="my-3 pb-0" style={{
                            fontSize: '20px'
                        }}>Athletes</Typography>

                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Confirmation</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete this athlete?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancelar</Button>
                                <Button onClick={() => handleDelete(idAthlete)} color="error">
                                    Excluir
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Typography id="margin2">
                            Here you can see all the athletes that are currently available. Click on the athlete to see more details.
                        </Typography>

                        <TextField
                            label="Search by athlete name"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            size="large"
                            sx={{ width: '100%', margin: '0 0 1rem'}}
                        />

                        {isMobile ? (
                            <Grid item xs={12} sm={12}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={handleOpenDialog}
                                    style={{ textTransform: 'none', color: 'success', marginBottom: '3vh' }}
                                    sx={{ width: '100%', maxWidth: '100%'}}
                                >
                                    Create athlete
                                </Button>
                            </Grid>
                        ) : (
                            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog}
                                        style={{ textTransform: 'none', color: 'success', marginBottom: '1vh' }}>
                                    Create athlete
                                </Button>
                            </Grid>
                        )}

                        <CreateAthlete
                            open={openDialog}
                            onClose={handleCloseDialog}
                            onCreate={handleCreateAthlete}
                        />

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
                                <p id="error2">There are no athletes at the moment!</p>
                            </div>
                        )}

                        {data.length !== 0 && (
                            <div>
                                <div>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell id="esconde">Fed id</TableCell>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell id="esconde">Country</TableCell>
                                                    <TableCell id="esconde">Gender</TableCell>
                                                    <TableCell>Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {filteredData.length > 0 && filteredData.map((item) => (
                                                    <TableRow style={{cursor: 'pointer'}} key={item.id}
                                                              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                                        <TableCell id="esconde" >{item.fed_id}</TableCell>
                                                        <TableCell>{item.first_name.charAt(0).toUpperCase() + item.first_name.slice(1).toLowerCase()
                                                                    + " " + item.last_name.charAt(0).toUpperCase() + item.last_name.slice(1).toLowerCase()}
                                                        </TableCell>

                                                        <TableCell id="esconde">
                                                            <Tooltip title={item.country.toUpperCase()}>
                                                                {getCountryFlag(item.country)}
                                                            </Tooltip>
                                                        </TableCell>

                                                        <TableCell id="esconde">
                                                            {item.gender === "F" && (
                                                                <Tooltip title="Feminine" className="tooltip-gender">
                                                                    {GetGenderFlags(item.gender)}
                                                                </Tooltip>
                                                            )}
                                                            {item.gender === "M" && (
                                                                <Tooltip title="Masculine" className="tooltip-gender">
                                                                    {GetGenderFlags(item.gender)}
                                                                </Tooltip>
                                                            )}
                                                        </TableCell>

                                                        <TableCell>
                                                            <Tooltip title="Edit" className="tooltip-gender">
                                                                <IconButton >
                                                                    <EditIcon color="gray" style={{cursor: 'pointer'}}/>
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Remove" className="tooltip-gender">
                                                                <IconButton onClick={() => handleClickOpen(item.id)}>
                                                                    <DeleteIcon color="error" style={{cursor: 'pointer'}}/>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}

                                                {filteredData.length === 0 &&
                                                    <TableRow onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                                        <TableCell colSpan={4} id="error2" align="left"> Athlete not found!</TableCell>
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
};

export default Athletes;