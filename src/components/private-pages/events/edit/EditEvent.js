import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import {
    endpoints,
    putEndpointEventById, getEndpointEventById
} from "../../../../api/Urls";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const EditEvent = ({open, onClose, idEvent, idComp}) => {
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [eventClass, setEventClass] = useState('');
    const [round, setRound] = useState('');

    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [warningDialogOpen, setWarningDialogOpen] = useState(false);

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleEventClassChange = (event) => {
        setEventClass(event.target.value);
    };
    const handleRoundChange = (event) => {
        setRound(event.target.value);
    };
    const submitEditEvent = async () => {

        const data = {
            code: code.toUpperCase(),
            rounds: round,
            event_class: eventClass.charAt(0).toUpperCase() + eventClass.slice(1).toLowerCase().trim(),
            name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase().trim(),
        };

        try {
            const response = await axios.put(putEndpointEventById("eventBy", idComp, idEvent), data, {
                headers: {
                    Authorization: `Token ${usuarioSalvo.token}`,
                },
            });

            setSuccessDialogOpen(true);
            setTimeout(() => {
                setSuccessDialogOpen(false);
                onClose();
            }, 3000);
        } catch (error) {
            console.error(error.request.response);
            setErrorDialogOpen(true);
            setTimeout(() => {
                setErrorDialogOpen(false);
            }, 3000);
        }
    };
    const handleEdit = async () => {
        if (isFormEmpty()) {
            setWarningDialogOpen(true);
            setTimeout(() => {
                setWarningDialogOpen(false);
            }, 3000);
        } else {
            try {
                await submitEditEvent();
            } catch (error) {
                console.error('An error occurred while making the request.');
            }
        }
    };
    const fieldsAndClose = () => {
        setSuccessDialogOpen(false);
        setErrorDialogOpen(false);
    };
    const isFormEmpty = () => {
        if (name.trim() === '' || eventClass.trim() === '' || round === '' || code === '') {
            return true; // Form is empty
        }
        return false; // Form is not empty
    };

    useEffect(() => {
        const fetchAthletesData = async () => {
            try {
                const response = await axios.get(getEndpointEventById("eventBy", idComp, idEvent), {
                    headers: {
                        Authorization: `Token ${usuarioSalvo.token}`,
                    },
                });

                const eventData = response.data;
                setCode(eventData.code.toUpperCase());
                setName(eventData.name.charAt(0).toUpperCase() + eventData.name.slice(1).toLowerCase());
                setEventClass(eventData.event_class.charAt(0).toUpperCase() +" "+ eventData.event_class.slice(1).toLowerCase().trim());
                setRound(eventData.rounds);
            } catch (error) {
                console.error('An error occurred while fetching the Event.');
            }
        };

        if (open) {
            fetchAthletesData();
        }
    }, [open, idEvent, idComp, usuarioSalvo.token]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogContent>

                <Dialog open={warningDialogOpen} onClose={() => setWarningDialogOpen(false)}>
                    <DialogContent>
                        <DialogContentText sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ReportProblemIcon sx={{ color: 'orange', fontSize: 48, marginBottom: '1%' }} />
                            All fields above are required!
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

                <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
                    <DialogContent>
                        <DialogContentText sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <ReportProblemIcon sx={{color: 'red', fontSize: 48, marginBottom: '1%'}}/>
                            Error: Failed to edit event. Please try again.
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

                <Grid container spacing={2} sx={{marginTop: '0.0rem'}}>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Code"
                            value={code}
                            onChange={handleCodeChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Event name"
                            value={name}
                            onChange={handleNameChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Event class"
                            value={eventClass}
                            onChange={handleEventClassChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="Rounds"
                            value={round}
                            onChange={handleRoundChange}
                            fullWidth
                        >
                            {Array.from({length: 100}, (_, index) => (
                                <MenuItem key={index} value={index}>
                                    {index}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Dialog open={successDialogOpen} onClose={fieldsAndClose}>
                    <DialogContent>
                        <DialogContentText sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <DoneIcon sx={{color: 'green', fontSize: 48, marginBottom: '1%'}}/>
                            Event edited Successfully!
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {fieldsAndClose(); onClose();}} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleEdit} color="primary">
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditEvent;