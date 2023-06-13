import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Grid, DialogContentText } from '@mui/material';
import axios from "axios";
import { endpoints, getEndpointCreateEvent } from "../../../../api/Urls";
import DoneIcon from '@mui/icons-material/Done';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const CreateEvent = ({ open, onClose, idComp }) => {
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [eventClass, setEventClass] = useState('');
    const [round, setRound] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);

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

    const submitCreateEvent = async () => {
        const data = {
            code: code,
            rounds: round,
            event_class: eventClass,
            name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase().trim(),
        };

        try {
            const response = await axios.post(getEndpointCreateEvent("eventBy", idComp), data, {
                headers: {
                    Authorization: `Token ${usuarioSalvo.token}`,
                },
            });

            setSuccessDialogOpen(true);
            setTimeout(() => {
                cleanFieldsAndClose();
                cleanFields();
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

    const handleCreate = async () => {
        if (isFormEmpty()) {
            setErrorMessage('All fields above are required!');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        } else {
            try {
                await submitCreateEvent();
            } catch (error) {
                console.error('An error occurred while making the request.');
            }
        }
    };

    const cleanFields = () => {
        setName('');
        setEventClass('');
        setRound('');
        setCode('');
    };

    const cleanFieldsAndClose = () => {
        cleanFields();
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
        cleanFields();
    }, []);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Create Event</DialogTitle>
            <DialogContent>
                <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
                    <DialogContent>
                        <DialogContentText sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ReportProblemIcon sx={{ color: 'red', fontSize: 48, marginBottom: '1%' }} />
                            Error: Failed to create event. Please try again.
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <Grid container spacing={2} sx={{ marginTop: '0.0rem' }}>
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
                            select
                            label="Code"
                            value={code}
                            onChange={handleCodeChange}
                            fullWidth
                        >
                            {Array.from({ length: 61 }, (_, index) => (
                                <MenuItem key={index} value={index + 100}>
                                    {index + 100}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="Event class"
                            value={eventClass}
                            onChange={handleEventClassChange}
                            fullWidth
                        >
                            <MenuItem value="5 Star">5 Star</MenuItem>
                            <MenuItem value="4 Star">4 Star</MenuItem>
                            <MenuItem value="3 Star">3 Star</MenuItem>
                            <MenuItem value="2 Star">2 Star</MenuItem>
                            <MenuItem value="1 Star">1 Star</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="Rounds"
                            value={round}
                            onChange={handleRoundChange}
                            fullWidth
                        >
                            {Array.from({ length: 100 }, (_, index) => (
                                <MenuItem key={index} value={index + 1}>
                                    {index + 1}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <div align="right">
                            {errorMessage && (<p id="error">{errorMessage}</p>)}
                        </div>
                    </Grid>
                </Grid>
                <Dialog open={successDialogOpen} onClose={cleanFieldsAndClose}>
                    <DialogContent>
                        <DialogContentText sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <DoneIcon sx={{ color: 'green', fontSize: 48, marginBottom: '1%' }} />
                            Event created successfully!
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        cleanFieldsAndClose();
                        onClose();
                    }}
                    color="primary"
                >
                    Cancel
                </Button>
                <Button onClick={handleCreate} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateEvent;
