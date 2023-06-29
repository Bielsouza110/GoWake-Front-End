import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
    Grid,
    DialogContentText
} from '@mui/material';
import axios from "axios";
import {getEndpointCreateCompetition} from "../../../../api/Urls";
import DoneIcon from '@mui/icons-material/Done';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {countryCodeMatrix} from "../../athetes/ultils/Utils";
import Typography from "@mui/material/Typography";

const CreateCompetition = ({open, onClose}) => {

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));
    countryCodeMatrix.sort();

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [venue, setVenue] = useState('');
    const [organizingCountry, setOrganizingCountry] = useState('');

    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [warningDialogOpen, setWarningDialogOpen] = useState(false);

    /*----Data start----*/
    const [yearStart, setYearStart] = useState('');
    const [monthStart, setMonthStart] = useState('');
    const [dayStart, setDayStart] = useState('');
    const [hourStart, setHourStart] = useState('');
    const [minuteStart, setMinuteStart] = useState('');

    /*----Data end----*/
    const [yearEnd, setYearEnd] = useState('');
    const [monthEnd, setMonthEnd] = useState('');
    const [dayEnd, setDayEnd] = useState('');
    const [hourEnd, setHourEnd] = useState('');
    const [minuteEnd, setMinuteEnd] = useState('');

    /*----Data start----*/
    const handleYearStartChange = (event) => {
        setYearStart(event.target.value);
    };
    const handleMonthStartChange = (event) => {
        setMonthStart(event.target.value);
    };
    const handleDayStartChange = (event) => {
        setDayStart(event.target.value);
    };
    const handleHourStartChange = (event) => {
        setHourStart(event.target.value); };
    const handleMinuteStartChange = (event) => {
        setMinuteStart(event.target.value); };

    /*----Data end----*/
    const handleYearEndChange = (event) => {
        setYearEnd(event.target.value);
    };
    const handleMonthEndChange = (event) => {
        setMonthEnd(event.target.value);
    };
    const handleDayEndChange = (event) => {
        setDayEnd(event.target.value);
    };
    const handleHourEndChange = (event) => {
        setHourEnd(event.target.value); };
    const handleMinuteEndChange = (event) => {
        setMinuteEnd(event.target.value);
    };

    /*----Others----*/
    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleVenueChange = (event) => {
        setVenue(event.target.value);
    };
    const handleOrganizingCountryChange = (event) => {
        setOrganizingCountry(event.target.value);
    };

    const submitCreateCompetiton = async () => {

        const data = {
            code: code,
            discipline: "Wakeboard",
            name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase().trim(),
            organizing_country: organizingCountry.toUpperCase().trim(),
            tournament_type: "NatcCH",
            venue: venue.charAt(0).toUpperCase() + venue.slice(1).toLowerCase().trim(),
            site_code: organizingCountry.toUpperCase().trim(),
            age_groups: "IWWF",
            beginning_date: `${yearStart}-${monthStart}-${dayStart} ${hourStart}:${minuteStart}:00`,
            end_date: `${yearEnd}-${monthEnd}-${dayEnd} ${hourEnd}:${minuteEnd}:00`,
        };

        try {
            const response = await axios.post(getEndpointCreateCompetition("competitionCreate"), data, {
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
            await submitCreateCompetiton();
        }
    };
    const cleanFields = () => {
        setCode('');
        setName('');
        setVenue('');
        setOrganizingCountry('');

        /*----Data start----*/
        setYearStart('');
        setMonthStart('');
        setDayStart('');
        setHourStart('');
        setMinuteStart('');

        /*----Data end----*/
        setYearEnd('');
        setMonthEnd('');
        setDayEnd('');
        setHourEnd('');
        setMinuteEnd('');
    };
    const cleanFieldsAndClose = () => {
        cleanFields();
        setSuccessDialogOpen(false);
        setErrorDialogOpen(false);
    };
    const isFormEmpty = () => {
        if (
            code === '' ||
            name.trim() === '' ||
            venue.trim() === '' ||
            organizingCountry.trim() === '' ||
            yearStart=== '' ||
            monthStart === '' ||
            dayStart === '' ||
            hourStart=== '' ||
            minuteStart === '' ||
            yearEnd === '' ||
            monthEnd === '' ||
            dayEnd === '' ||
            hourEnd === '' ||
            minuteEnd === ''
        ) {
            return true; // Form is empty
        }
        return false; // Form is not empty
    };

    useEffect(() => {
        cleanFields();
    }, []);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Create competition</DialogTitle>
            <DialogContent>

                <Dialog open={warningDialogOpen} onClose={() => setWarningDialogOpen(false)}>
                    <DialogContent>
                        <DialogContentText sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <ReportProblemIcon sx={{color: 'orange', fontSize: 48, marginBottom: '1%'}}/>
                            All fields above are required!
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

                <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
                    <DialogContent>
                        <DialogContentText sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <ReportProblemIcon sx={{color: 'red', fontSize: 48, marginBottom: '1%'}}/>
                            Please contact the administrator. You do not have permission.
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
                            label="Competition name"
                            value={name}
                            onChange={handleNameChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="Country"
                            value={organizingCountry}
                            onChange={handleOrganizingCountryChange}
                            fullWidth
                        >
                            {countryCodeMatrix.map((code) => (
                                <MenuItem key={code.toUpperCase()} value={code}>
                                    <img src={`https://flagcdn.com/16x12/${code}.png`} alt={code}
                                         style={{marginRight: '1rem'}}/>
                                    {code.toUpperCase()}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="venue"
                            value={venue}
                            onChange={handleVenueChange}
                            fullWidth
                        />
                    </Grid>

                    {/*-------------------------------------------*/}

                    <Grid item xs={12} sm={6}>
                        <Typography id="margin3" variant="h6" fontWeight="bold" style={{fontSize: '16px'}}>
                            Start Date
                        </Typography>
                    </Grid>

                    <Grid id="esconde" item xs={12} sm={6}>
                        <Typography id="margin3" variant="h6" fontWeight="bold" style={{fontSize: '16px'}}>
                            Start Time
                        </Typography>
                    </Grid>

                    <Grid item xs={3.7} sm={2} sx={{display: 'flex', alignItems: 'center'}}>
                        <TextField
                            select
                            label="Day"
                            value={dayStart}
                            onChange={handleDayStartChange}
                            fullWidth
                        >
                            {Array.from({length: 31}, (_, index) => (
                                <MenuItem key={index} value={index + 1}>
                                    {index + 1}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={3.7} sm={2} sx={{display: 'flex', alignItems: 'center'}}>
                        <TextField
                            select
                            label="Month"
                            value={monthStart}
                            onChange={handleMonthStartChange}
                            fullWidth
                        >
                            {Array.from({length: 12}, (_, index) => (
                                <MenuItem key={index} value={index + 1}>
                                    {index + 1}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={4.5} sm={2} sx={{display: 'flex', alignItems: 'center'}}>
                        <TextField
                            select
                            label="Year"
                            value={yearStart}
                            onChange={handleYearStartChange}
                            fullWidth
                        >
                            {Array.from({length: 80}, (_, index) => (
                                <MenuItem key={index} value={2023 + index}>
                                    {2023 + index}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <TextField
                            select
                            label="Hour"
                            value={hourStart}
                            onChange={handleHourStartChange}
                            fullWidth
                        >
                            {Array.from({ length: 24 }, (_, index) => (
                                <MenuItem key={index} value={index}>
                                    {index.toString().padStart(2, '0')}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            select
                            label="Minute"
                            value={minuteStart}
                            onChange={handleMinuteStartChange}
                            fullWidth
                        >
                            {Array.from({ length: 60 }, (_, index) => (
                                <MenuItem key={index} value={index}>
                                    {index.toString().padStart(2, '0')}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>


                    {/*----------------------------------*/}

                    <Grid item xs={12} sm={6}>
                        <Typography id="margin3" variant="h6" fontWeight="bold" style={{fontSize: '16px'}}>
                            End Date
                        </Typography>
                    </Grid>

                    <Grid id="esconde" item xs={12} sm={6}>
                        <Typography id="margin3" variant="h6" fontWeight="bold" style={{fontSize: '16px'}}>
                            End Time
                        </Typography>
                    </Grid>

                    <Grid item xs={3.7} sm={2} sx={{display: 'flex', alignItems: 'center'}}>
                        <TextField
                            select
                            label="Day"
                            value={dayEnd}
                            onChange={handleDayEndChange}
                            fullWidth
                        >
                            {Array.from({length: 31}, (_, index) => (
                                <MenuItem key={index} value={index + 1}>
                                    {index + 1}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={3.7} sm={2} sx={{display: 'flex', alignItems: 'center'}}>
                        <TextField
                            select
                            label="Month"
                            value={monthEnd}
                            onChange={handleMonthEndChange}
                            fullWidth
                        >
                            {Array.from({length: 12}, (_, index) => (
                                <MenuItem key={index} value={index + 1}>
                                    {index + 1}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={4.5} sm={2} sx={{display: 'flex', alignItems: 'center'}}>
                        <TextField
                            select
                            label="Year"
                            value={yearEnd}
                            onChange={handleYearEndChange}
                            fullWidth
                        >
                            {Array.from({length: 80}, (_, index) => (
                                <MenuItem key={index} value={2023 + index}>
                                    {2023 + index}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <TextField
                            select
                            label="Hour"
                            value={hourEnd}
                            onChange={handleHourEndChange}
                            fullWidth
                        >
                            {Array.from({ length: 24 }, (_, index) => (
                                <MenuItem key={index} value={index}>
                                    {index.toString().padStart(2, '0')}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            select
                            label="Minute"
                            value={minuteEnd}
                            onChange={handleMinuteEndChange}
                            fullWidth
                        >
                            {Array.from({ length: 60 }, (_, index) => (
                                <MenuItem key={index} value={index}>
                                    {index.toString().padStart(2, '0')}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/*----------------------------------*/}

                </Grid>
                <Dialog open={successDialogOpen} onClose={cleanFieldsAndClose}>
                    <DialogContent>
                        <DialogContentText sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <DoneIcon sx={{color: 'green', fontSize: 48, marginBottom: '1%'}}/>
                            Competition created successfully!
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

export default CreateCompetition;
