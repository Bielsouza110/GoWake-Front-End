import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {countryCodeMatrix, getYearOptions} from "../../athetes/ultils/Utils";
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import {getEndpointCompetitionById, putEndpointCompetitionById} from "../../../../api/Urls";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import Typography from "@mui/material/Typography";

const EditCompetition = ({open, onClose, idComp}) => {

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

    const submitEditCompetition = async () => {

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
            const response = await axios.put(putEndpointCompetitionById("competitionsBy", idComp), data, {
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
            //console.error(error.request.response);
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
                await submitEditCompetition();
            } catch (error) {
                console.error('An error occurred while making the request.');
            }
        }
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
        const fetchCompetitionData = async () => {
            try {
                const response = await axios.get(getEndpointCompetitionById("competitionsBy", idComp), {
                    headers: {
                        Authorization: `Token ${usuarioSalvo.token}`,
                    },
                });

                const competitionData = response.data;

                const startDate = new Date(competitionData.beginning_date);
                const endDate = new Date(competitionData.end_date);

                setYearStart(startDate.getFullYear());
                setMonthStart(startDate.getMonth() + 1);
                setDayStart(startDate.getDate());
                setHourStart(startDate.getHours());
                setMinuteStart(startDate.getMinutes());

                setYearEnd(endDate.getFullYear());
                setMonthEnd(endDate.getMonth() + 1);
                setDayEnd(endDate.getDate());
                setHourEnd(endDate.getHours());
                setMinuteEnd(endDate.getMinutes());

              /*
                const dateStartComp = String(competitionData.beginning_date.toUpperCase());

                const [dateStartBeg, timeStartBeg] = dateStartComp.split('T');
                const [yearStartBeg, monthStartBeg, dayStartBeg] = dateStartBeg.split('-');
                const [hourStartBeg, minuteStartBeg] = timeStartBeg.split(/:|Z/);

                const dateEndComp = String(competitionData.end_date.toUpperCase());

                const [dateEndBeg, timeEndBeg] = dateEndComp.split('T');
                const [yearEndtBeg, monthEndBeg, dayEndBeg] = dateEndBeg.split('-');
                const [hourEndBeg, minuteEndBeg] = timeEndBeg.split(/:|Z/);
*/
                setCode(competitionData.code.toUpperCase());
                setName(competitionData.name.charAt(0).toUpperCase() + competitionData.name.slice(1).toLowerCase());
                setVenue(competitionData.venue.charAt(0).toUpperCase() + competitionData.venue.slice(1).toLowerCase());
                setOrganizingCountry(String(competitionData.organizing_country.toLowerCase()));

               /* setYearStart(yearStartBeg);
                setMonthStart(monthStartBeg);
                setDayStart(dayStartBeg);
                setHourStart(hourStartBeg);
                setMinuteStart(minuteStartBeg);

                setYearEnd(yearEndtBeg);
                setMonthEnd(monthEndBeg);
                setDayEnd(dayEndBeg);
                setHourEnd(hourEndBeg);
                setMinuteEnd(minuteEndBeg);*/

            } catch (error) {
                console.error(error);
            }
        };

        if (open) {
            fetchCompetitionData();
        }
    }, [open, idComp, usuarioSalvo.token]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Edit Competition</DialogTitle>
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
                <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
                    <DialogContent>
                        <DialogContentText sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <DoneIcon sx={{color: 'green', fontSize: 48, marginBottom: '1%'}}/>
                            Competition successfully edited!
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        onClose();
                    }}
                    color="primary"
                >
                    Cancel
                </Button>
                <Button onClick={handleEdit} color="primary">
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCompetition;