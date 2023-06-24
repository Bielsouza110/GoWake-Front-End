import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {countryCodeMatrix, getYearOptions} from "../../athetes/ultils/Utils";
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import {getAllGenderFlags} from "../../dashboard/utils/Utils";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import {
    endpoints, getEndpointAthleteById,
    getEndpointOfficialById, putEndpointAthleteById, putEndpointOfficialById
} from "../../../../api/Urls";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const EditOfficial = ({open, onClose, idOffic, idComp}) => {
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const [iwwfId, setIwwfId] = useState('');
    const [position, setPosition] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [qualification, setQualification] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');

    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [warningDialogOpen, setWarningDialogOpen] = useState(false);

    const regions = [
        'Africa',
        'Asia',
        'Europe',
        'North America',
        'Oceania',
        'South America'
    ]
    const positions = [
        'Chief calculator',
        'Calculator',
        'Chief judge',
        'Judge',
        'Boat Driver'
    ]
    countryCodeMatrix.sort();

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    const handleIwwfIdChange = (event) => {
        setIwwfId(event.target.value);
    };
    const handlePositionChange = (event) => {
        setPosition(event.target.value);
    };
    const handleQualificationChange = (event) => {
        setQualification(String(event.target.value));
    };
    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };
    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };
    const submitEditOfficial = async () => {

        const data = {
            iwwfid: iwwfId.toUpperCase().trim(),
            position: position.charAt(0).toUpperCase() + position.slice(1).toLowerCase().trim(),
            first_name: firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase().trim(),
            last_name: lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase().trim(),
            qualification: qualification.toUpperCase().trim(),
            country: country.toUpperCase().trim(),
            region: region.trim(),
        };

        try {
            const response = await axios.put(putEndpointOfficialById("officialBy", idComp, idOffic), data, {
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
                await submitEditOfficial();
            } catch (error) {
                console.error('An error occurred while making the request.');
            }
        }
    };

    useEffect(() => {
        const fetchOfficialsData = async () => {

            try {
                const response = await axios.get(getEndpointOfficialById("officialBy", idComp, idOffic), {
                    headers: {
                        Authorization: `Token ${usuarioSalvo.token}`,
                    },
                });
                const officialData = response.data;
                setIwwfId(officialData.iwwfid.toUpperCase());
                setPosition(officialData.position.charAt(0).toUpperCase() + officialData.position.slice(1).toLowerCase().trim());
                setFirstName(officialData.first_name.charAt(0).toUpperCase() + officialData.first_name.slice(1).toLowerCase().trim());
                setLastName(officialData.last_name.charAt(0).toUpperCase() + officialData.last_name.slice(1).toLowerCase().trim());
                setQualification(String(officialData.qualification.toUpperCase()));
                setCountry(String(officialData.country.toLowerCase()));
                setRegion(officialData.region);
            } catch (error) {
                console.error('An error occurred while fetching athlete data:', error);
            }
        }

        if (open) {
            fetchOfficialsData();
        }
    }, [open, idOffic, idComp, usuarioSalvo.token]);

    const isFormEmpty = () => {
        if (
            firstName.trim() === '' ||
            lastName.trim() === '' ||
            iwwfId.trim() === '' ||
            position.trim() === '' ||
            qualification.trim() === '' ||
            country.trim() === '' ||
            region.trim() === ''
        ) {
            return true; // Form is empty
        }
        return false; // Form is not empty
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Edit Official</DialogTitle>
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
                            Error: Failed to edit official. Please try again.
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

                <Grid container spacing={2} sx={{marginTop: '0.0rem'}}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            value={lastName}
                            onChange={handleLastNameChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Iwwf Id"
                            value={iwwfId}
                            onChange={handleIwwfIdChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Qualification"
                            value={qualification}
                            onChange={handleQualificationChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="Country"
                            value={country}
                            onChange={handleCountryChange}
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
                            select
                            label="Region"
                            value={region}
                            onChange={handleRegionChange}
                            fullWidth
                        >
                            {regions.map((r) => (
                                <MenuItem key={r} value={r}>
                                    {r}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            select
                            label="Position"
                            value={position}
                            onChange={handlePositionChange}
                            fullWidth
                        >
                            {positions.map((p) => (
                                <MenuItem key={p} value={p}>
                                    {p}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
                    <DialogContent>
                        <DialogContentText sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <DoneIcon sx={{color: 'green', fontSize: 48, marginBottom: '1%'}}/>
                            Official successfully edited!
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {onClose();}} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleEdit} color="primary">
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditOfficial;
