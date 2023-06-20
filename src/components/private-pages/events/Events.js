import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from "../../../navs/Drawer";
import DrawerHeader from "../../../navs/DrawerHeader";
import {Container} from "@material-ui/core";
import {MDBContainer} from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import {
    Divider,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {getEndpointCompetitionById, getEndpointDeleteEventById} from "../../../api/Urls";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DoneIcon from "@mui/icons-material/Done";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CreateEvent from "../events/create/CreateEvent";
import EditEvent from "../../private-pages/events/edit/EditEvent";
import AddIcon from "@mui/icons-material/Add";
import {Spinner} from "react-bootstrap";
import WarningIcon from "@mui/icons-material/Warning";
import {handleMouseEnter, handleMouseLeave} from "../dashboard/utils/Utils";
import Tooltip from "@mui/material/Tooltip";
import {Delete as DeleteIcon, Edit as EditIcon} from "@mui/icons-material";

const Events = ({idComp}) => {

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [idEvent, setIdEvent] = useState('');
    const [showSpinner, setShowSpinner] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [successDialogOpenDelete, setSuccessDialogOpenDeleteDelete] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [data, setData] = useState(null)

    const fetchEvents = async () => {
        const timer = setTimeout(() => {setShowSpinner(false);}, 3000); // Tempo limite de 3 segundos

       await axios.get(getEndpointCompetitionById("competitionsBy", idComp), {
            headers: {'Authorization': `Token ${usuarioSalvo.token}`}
        }).then(response => {
            setData(response.data);
        }).catch(error => {
            console.error(error);
        });

        return () => clearTimeout(timer);
    }
    const reload = () => {
        fetchEvents();

        const timer = setTimeout(() => {setShowSpinner(false);}, 3000); // Tempo limite de 3 segundos
        return () => clearTimeout(timer);
    }

    useEffect(() => {
        reload();
    }, []);
    const handleCloseSuccessDialogDelete = () => {
        setSuccessDialogOpenDeleteDelete(false);
    };
    const handleEventDelete = async (idComp, idEvent) => {

        try {
            const response = await axios.delete(getEndpointDeleteEventById("eventBy", idComp, idEvent), {
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
            console.error('An error occurred while fetching the events.');
            setErrorDialogOpen(true);
            setTimeout(() => {
                setErrorDialogOpen(false);
            }, 3000);
        }
    };
    const handleClickOpenDelete = (compId, eventId) => {
        setIdEvent(eventId);
        setOpen(true);
    };
    const handleDelete = (idComp, eventId) => {
        handleEventDelete(idComp, eventId)
        handleClose();
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        fetchEvents();
        setOpenDialog(false);
    };
    const handleOpenEditDialog = (competitionId, eventId) => {
        setIdEvent(eventId);
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => {
        reload();
        setOpenEditDialog(false);
    };

    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <MDBContainer className="p-1 my-2">
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this event?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleDelete(idComp, idEvent)} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={successDialogOpenDelete} onClose={handleCloseSuccessDialogDelete}>
                <DialogContent>
                    <DialogContentText
                        sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <DoneIcon sx={{color: 'green', fontSize: 48, marginBottom: '1%'}}/>
                        Event deleted successfully!
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
                <DialogContent>
                    <DialogContentText
                        sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <ReportProblemIcon sx={{color: 'red', fontSize: 48, marginBottom: '1%'}}/>
                        Error: Failed to delete the event. Please try again.
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <CreateEvent
                open={openDialog}
                onClose={handleCloseDialog}
                idComp={idComp}
            />

            <EditEvent
                open={openEditDialog}
                onClose={handleCloseEditDialog}
                idEvent={idEvent}
                idComp={idComp}
            />

            <Typography variant="h6" fontWeight="bold" className="my-3 pb-0" style={{fontSize: '18px'}}>
                Events
            </Typography>

            <div><Divider style={{ backgroundColor: 'black', marginBottom: '3vh' }} /></div>

            {isMobile ? (
                <Grid item xs={12} sm={12}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon/>}
                        onClick={handleOpenDialog}
                        style={{textTransform: 'none', color: 'success', marginBottom: '3vh'}}
                        sx={{width: '100%', maxWidth: '100%'}}
                    >
                        Create event
                    </Button>
                </Grid>
            ) : (
                <Grid item xs={12} sm={12} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="contained" startIcon={<AddIcon/>} onClick={handleOpenDialog}
                            style={{textTransform: 'none', color: 'success', marginBottom: '1vh'}}>
                        Create event
                    </Button>
                </Grid>
            )}

            {data && (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>

                        {data && data.events && data.events.length === 0 && showSpinner && (
                            <div align="center">
                                <Spinner id="load" animation="border" variant="secondary" size="3rem"/>
                                <p id="load2">Loading...</p>
                            </div>
                        )}

                        {data && data.events && data.events.length === 0 && !showSpinner && (
                            <div align="center">
                                <WarningIcon style={{ color: 'red' , marginTop: '3vh'  }} />
                                <p id="error2">  There are no events at the moment!</p>
                            </div>
                        )}

                        {data && data.events && data.events.length !== 0 && (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell id="esconde">Code</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell id="esconde">Event class</TableCell>
                                            <TableCell id="esconde">Rounds</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.events.map((event) => (
                                            <TableRow style={{cursor: 'pointer'}} key={event.id}
                                                      onMouseEnter={handleMouseEnter}
                                                      onMouseLeave={handleMouseLeave}>
                                                <TableCell id="esconde">{event.code}</TableCell>
                                                <TableCell>
                                                    {event.name.charAt(0).toUpperCase() + event.name.slice(1).toLowerCase()}
                                                </TableCell>
                                                <TableCell id="esconde">
                                                    {event.event_class.toLowerCase()}
                                                </TableCell>
                                                <TableCell id="esconde">
                                                    {event.rounds}
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Edit" className="tooltip-gender">
                                                        <IconButton
                                                            onClick={() => handleOpenEditDialog(idComp, event.id)}>
                                                            <EditIcon color="gray"
                                                                      style={{cursor: 'pointer'}}/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Remove" className="tooltip-gender">
                                                        <IconButton
                                                            onClick={() => handleClickOpenDelete(idComp, event.id)}>
                                                            <DeleteIcon color="error"
                                                                        style={{cursor: 'pointer'}}/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
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
    );
};

export default Events;