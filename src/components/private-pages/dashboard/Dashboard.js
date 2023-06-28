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
    Button,
    IconButton
} from '@mui/material';
import {Spinner} from "react-bootstrap";
import Typography from '@mui/material/Typography';
import DrawerHeader from "../../../navs/DrawerHeader";
import {
    endpoints,
    getEndpointCompetitionById,
    getEndpointDeleteCompetition,
    getEndpointDeleteEventById
} from "../../../api/Urls";
import {getCountryFlag, handleMouseEnter, handleMouseLeave} from "./utils/Utils";
import Tooltip from "@mui/material/Tooltip";
import WarningIcon from "@mui/icons-material/Warning";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Delete as DeleteIcon, Edit as EditIcon} from "@mui/icons-material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CreateEvent from "../events/create/CreateEvent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DoneIcon from "@mui/icons-material/Done";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CreateCompetition from "./create/CreateCompetition";
import EditCompetition from "./edit/EditCompetition";

const Dashboard = () => {

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const navigate = useNavigate();
    const [showSpinner, setShowSpinner] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const [idComp, setIdComp] = useState('');
    const [data, setData] = useState([]);
    const isMobile = useMediaQuery('(max-width: 600px)');
    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.venue.toLowerCase().includes(searchTerm.toLowerCase()));

    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [successDialogOpenDelete, setSuccessDialogOpenDeleteDelete] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const fetchCompetition = async () => {

        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 3000); // Tempo limite de 3 segundos

        await axios.get(endpoints.competitions, {
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

        return () => clearTimeout(timer);
    }
    const reload = () => {
        fetchCompetition();

        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 3000);
        return () => clearTimeout(timer);
    }

    useEffect(() => {
        reload();
    }, []);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleCloseSuccessDialogDelete = () => {
        setSuccessDialogOpenDeleteDelete(false);
    };
    const handleEventDelete = async (idComp) => {

        try {
            const response = await axios.delete(getEndpointDeleteCompetition("competitionsBy", idComp), {
                headers: {
                    'Authorization': `Token ${usuarioSalvo.token}`
                }
            });

            reload();
            setSuccessDialogOpenDeleteDelete(true);
            setTimeout(() => {
                setSuccessDialogOpenDeleteDelete(false);
            }, 3000);

        } catch (error) {
            console.error('An error occurred while fetching the competitions.');
            setErrorDialogOpen(true);
            setTimeout(() => {
                setErrorDialogOpen(false);
            }, 3000);
        }
    };
    const handleClickOpenDelete = (compId) => {
        setIdComp(compId);
        setOpen(true);
    };
    const handleDelete = (idComp) => {
        handleEventDelete(idComp)
        handleClose();
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        fetchCompetition();
        setOpenDialog(false);
    };
    const handleOpenEditDialog = (competitionId) => {
        setIdComp(competitionId);
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => {
        reload();
        setOpenEditDialog(false);
    };
    const handleDetalhesClick = (id) => {
        navigate(`/login/dashboard/${id}`);
    };

    function downloadXML(content, fileName) {
        const element = document.createElement('a');
        const file = new Blob([content], {type: 'text/xml'});
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    const exportXML = () => {
        const xmlData = '<?xml version="1.0" encoding="UTF-8"?><root></root>'; // Initial XML data
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');

        // Add competitions to XML
        data.forEach((competition) => {
            const competitionNode = xmlDoc.createElement('competition');
            competitionNode.setAttribute('id', competition.id);

            // Add events to competition
            competition.events.forEach((event) => {
                const eventNode = xmlDoc.createElement('event');
                eventNode.setAttribute('id', event.id);
                eventNode.setAttribute('name', event.name);
                eventNode.setAttribute('rounds', event.rounds);
                eventNode.setAttribute('event_class', event.event_class);
                eventNode.setAttribute('code', event.code);
                competitionNode.appendChild(eventNode);
            });

            // Add officials to competition
            competition.officials.forEach((official) => {
                const officialNode = xmlDoc.createElement('official');
                officialNode.setAttribute('id', official.id);
                officialNode.setAttribute('first_name', official.first_name);
                officialNode.setAttribute('last_name', official.last_name);
                officialNode.setAttribute('position', official.position);
                officialNode.setAttribute('qualification', official.qualification);
                competitionNode.appendChild(officialNode);
            });

            // Add athletes to competition
            competition.athletes.forEach((athlete) => {
                const athleteNode = xmlDoc.createElement('athlete');
                athleteNode.setAttribute('id', athlete.id);
                athleteNode.setAttribute('first_name', athlete.first_name);
                athleteNode.setAttribute('last_name', athlete.last_name);
                athleteNode.setAttribute('country', athlete.country);
                athleteNode.setAttribute('gender', athlete.gender);
                competitionNode.appendChild(athleteNode);
            });

            xmlDoc.getElementsByTagName('root')[0].appendChild(competitionNode);
        });

        const serializer = new XMLSerializer();
        const exportedXML = serializer.serializeToString(xmlDoc);

        // Download the XML file
        downloadXML(exportedXML, 'competitions.xml');
    };

    return (
        <div className="sdd" style={{marginTop: isMobile ? "-3vh" : "-0.5vh"}}>
            <Box sx={{display: "flex"}}>
                <Drawer/>
                <Container id="marginDrawerHeader">
                    <DrawerHeader/>
                    <MDBContainer className="p-1 my-2">

                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Confirmation</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete this competition?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={() => handleDelete(idComp)} color="error">
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog open={successDialogOpenDelete} onClose={handleCloseSuccessDialogDelete}>
                            <DialogContent>
                                <DialogContentText
                                    sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <DoneIcon sx={{color: 'green', fontSize: 48, marginBottom: '1%'}}/>
                                    Competition deleted successfully!
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
                            <DialogContent>
                                <DialogContentText
                                    sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <ReportProblemIcon sx={{color: 'red', fontSize: 48, marginBottom: '1%'}}/>
                                    Error: Failed to delete the competition. Please try again.
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>

                        <CreateCompetition
                            open={openDialog}
                            onClose={handleCloseDialog}
                        />

                        <EditCompetition
                            open={openEditDialog}
                            onClose={handleCloseEditDialog}
                            idComp={idComp}
                        />

                        <Typography variant="h6" fontWeight="bold" className="my-3 pb-2" style={{fontSize: '20px'}}>
                            Welcome, <span id="nameUser">{usuarioSalvo.username}!</span>
                        </Typography>

                        <Typography id="margin2">
                            Here you can see all the competitions that are currently available. Click on the competition
                            to see more details.
                        </Typography>

                        {data.length === 0 && showSpinner && (
                            <div align="center">
                                <Spinner id="load" animation="border" variant="secondary" size="3rem"/>
                                <p id="load2">Loading...</p>
                            </div>
                        )}

                        {data.length === 0 && !showSpinner && (
                            <div align="center">
                                <WarningIcon style={{color: 'red', marginTop: '3vh'}}/>
                                <p id="error2">There are no competitions at the moment!</p>
                            </div>
                        )}

                        {data.length !== 0 && (
                            <div>
                                <div>
                                    <TextField
                                        label="Search by venue"
                                        variant="outlined"
                                        value={searchTerm}
                                        onChange={handleSearchTermChange}
                                        size="large"
                                        sx={{width: '100%', margin: '0 0 1rem'}}
                                    />

                                    {isMobile ? (
                                        <div>
                                            <Grid item xs={12} sm={12}>
                                                <Button
                                                    variant="contained"
                                                    startIcon={<AddIcon/>}
                                                    onClick={handleOpenDialog}
                                                    style={{textTransform: 'none', color: 'success', marginBottom: '3vh'}}
                                                    sx={{width: '100%', maxWidth: '100%'}}
                                                >
                                                    <span style={{ color: 'inherit' }}>Create competition</span>
                                                </Button>
                                            </Grid>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>

                                            <Button
                                                variant="contained"
                                                startIcon={<AddIcon />}
                                                onClick={handleOpenDialog}
                                                style={{ textTransform: 'none', color: 'success', marginLeft: 'auto', marginBottom: '2vh'}}
                                            >
                                                <span style={{ color: 'inherit' }}>Create competition</span>
                                            </Button>
                                        </div>
                                    )}


                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell id="esconde">Country</TableCell>
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
                                                        <TableCell id="esconde">
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
                                                                <IconButton onClick={(event) => {
                                                                    event.stopPropagation();
                                                                    handleOpenEditDialog(item.id);
                                                                }}>
                                                                    <EditIcon color="gray" style={{cursor: 'pointer'}}/>
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Remove" className="tooltip-gender">
                                                                <IconButton onClick={(event) => {
                                                                    event.stopPropagation();
                                                                    handleClickOpenDelete(item.id);
                                                                }}>
                                                                    <DeleteIcon color="error"
                                                                                style={{cursor: 'pointer'}}/>
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
