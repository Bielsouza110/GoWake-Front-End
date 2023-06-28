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

    const submitCreateEvent = async () => {
        const data = {
            code: code.toUpperCase(),
            rounds: round,
            event_class: eventClass.charAt(0).toUpperCase() + eventClass.slice(1).toLowerCase().trim(),
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
            setWarningDialogOpen(true);
            setTimeout(() => {
                setWarningDialogOpen(false);
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
                        <DialogContentText sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ReportProblemIcon sx={{ color: 'red', fontSize: 48, marginBottom: '1%' }} />
                            Please contact the administrator. You do not have permission.
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

                <Grid container spacing={2} sx={{ marginTop: '0.0rem' }}>

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
                            {Array.from({ length: 100 }, (_, index) => (
                                <MenuItem key={index} value={index + 1}>
                                    {index + 1}
                                </MenuItem>
                            ))}
                        </TextField>
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
