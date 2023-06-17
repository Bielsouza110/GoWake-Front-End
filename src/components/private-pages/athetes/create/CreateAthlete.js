import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Grid, DialogContentText} from '@mui/material';
import axios from "axios";
import { endpoints, getEndpointCompetitionById, getEndpointCreateAthlete } from "../../../../api/Urls";
import {getAllGenderFlags} from "../../dashboard/utils/Utils";
import DoneIcon from '@mui/icons-material/Done';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {countryCodeMatrix, getYearOptions} from "../ultils/Utils";

const CreateAthlete = ({ open, onClose, idComp}) => {
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fedId, setFedId] = useState('');
    const [gender, setGender] = useState('');
    const [yearOfBirth, setYearOfBirth] = useState('');
    const [realCategory, setRealCategory] = useState([]);
    const [categoryInCompetition, setCategoryInCompetition] = useState([]);
    const [country, setCountry] = useState('');

    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [warningDialogOpen, setWarningDialogOpen] = useState(false);

    countryCodeMatrix.sort();

    const handleRealCategory = (event) => {
        setRealCategory(event.target.value);
    };
    const handleCategoryInCompetition= (event) => {
        setCategoryInCompetition(event.target.value);
    };
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    const handleFedIdChange = (event) => {
        setFedId(event.target.value);
    };
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    const handleYearOfBirthChange = (event) => {
        setYearOfBirth(String(event.target.value));
    };
    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };
    const submitCreateAthlete = async () => {

        const data = {
            events: [],
            fed_id: fedId.toUpperCase().trim(),
            first_name: firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase().trim(),
            last_name: lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase().trim(),
            country: country.toUpperCase().trim(),
            gender: gender.trim(),
            year_of_birth: parseInt(yearOfBirth.trim()),
            real_category: realCategory.toUpperCase(),
            category_in_competition: categoryInCompetition.toUpperCase()
        };

        try {
            const response = await axios.post(getEndpointCreateAthlete("athleteBy", idComp), data, {
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
                await submitCreateAthlete();
            } catch (error) {
                console.error('An error occurred while making the request.');
            }
        }
    };
    const cleanFields = () => {
        setFedId('');
        setFirstName('');
        setLastName('');
        setCountry('');
        setGender('');
        setYearOfBirth('');
        setRealCategory('');
        setCategoryInCompetition('');
    };
    const cleanFieldsAndClose = () => {
        cleanFields();
        setSuccessDialogOpen(false);
        setErrorDialogOpen(false);
    };
    const isFormEmpty = () => {
        if (
            firstName.trim() === '' ||
            lastName.trim() === '' ||
            fedId.trim() === '' ||
            gender.trim() === '' ||
            yearOfBirth.trim() === '' ||
            country.trim() === '' ||
            realCategory.trim() === '' ||
            categoryInCompetition.trim() == ''
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
            <DialogTitle>Create Athlete</DialogTitle>
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
                            Error: Failed to create athlete. Please try again.
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

                <Grid container spacing={2} sx={{ marginTop: '0.0rem' }}>
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
                            label="Fed ID"
                            value={fedId}
                            onChange={handleFedIdChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="Gender"
                            value={gender}
                            onChange={handleGenderChange}
                            fullWidth
                        >
                            <MenuItem value="M">{getAllGenderFlags("M", "Masculine")}</MenuItem>
                            <MenuItem value="F">{getAllGenderFlags("F", "Feminine")}</MenuItem>
                        </TextField>
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
                                         style={{ marginRight: '1rem' }} />
                                    {code.toUpperCase()}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="Year of Birth"
                            value={yearOfBirth}
                            onChange={handleYearOfBirthChange}
                            fullWidth
                        >
                            {getYearOptions().map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Real category"
                            value={realCategory}
                            onChange={handleRealCategory}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Category in competition"
                            value={categoryInCompetition}
                            onChange={handleCategoryInCompetition}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Dialog open={successDialogOpen} onClose={cleanFieldsAndClose}>
                    <DialogContent>
                        <DialogContentText sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <DoneIcon sx={{ color: 'green', fontSize: 48, marginBottom: '1%' }} />
                            Athlete created successfully!
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

export default CreateAthlete;