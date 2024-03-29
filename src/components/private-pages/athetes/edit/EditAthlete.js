import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {countryCodeMatrix, getYearOptions} from "../ultils/Utils";
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import {getAllGenderFlags} from "../../dashboard/utils/Utils";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import {getEndpointAthleteById, putEndpointAthleteById} from "../../../../api/Urls";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const EditAthlete = ({open, onClose, idAth, idComp}) => {
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

    const categories = [
        'U14',
        'U18',
        'O30',
        'O40',
        'O50',
        'Open'
    ]

    const handleRealCategory = (event) => {
        setRealCategory(event.target.value);
    };
    const handleCategoryInCompetition = (event) => {
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
    const submitEditAthlete = async () => {

        const data = {
            events: [],
            fed_id: fedId.toUpperCase().trim(),
            first_name: firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase().trim(),
            last_name: lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase().trim(),
            country: country.toUpperCase().trim(),
            gender: gender.charAt(0).toUpperCase().trim(),
            year_of_birth: parseInt(yearOfBirth.trim()),
            real_category: realCategory.charAt(0).toUpperCase() + realCategory.slice(1).toLowerCase().trim(),
            category_in_competition: categoryInCompetition.charAt(0).toUpperCase() + categoryInCompetition.slice(1).toLowerCase().trim()
        };

        try {
            const response = await axios.put(putEndpointAthleteById("athleteBy", idComp, idAth), data, {
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
                await submitEditAthlete();
            } catch (error) {
                console.error('An error occurred while making the request.');
            }
        }
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
            categoryInCompetition.trim() === ''
        ) {
            return true; // Form is empty
        }
        return false; // Form is not empty
    };

    useEffect(() => {
        const fetchAthletesData = async () => {
            try {
                const response = await axios.get(getEndpointAthleteById("athleteBy", idComp, idAth), {
                    headers: {
                        Authorization: `Token ${usuarioSalvo.token}`,
                    },
                });

                const athleteData = response.data;
                setFirstName(athleteData.first_name.charAt(0).toUpperCase() + athleteData.first_name.slice(1).toLowerCase());
                setLastName(athleteData.last_name.charAt(0).toUpperCase() + athleteData.last_name.slice(1).toLowerCase());
                setFedId(athleteData.fed_id.toUpperCase());
                setGender(athleteData.gender.charAt(0).toUpperCase().trim());
                setYearOfBirth(String(athleteData.year_of_birth));
                setCountry(String(athleteData.country.toLowerCase()));
                setRealCategory(athleteData.real_category.charAt(0).toUpperCase() + athleteData.real_category.slice(1).toLowerCase().trim());
                setCategoryInCompetition(athleteData.category_in_competition.charAt(0).toUpperCase() + athleteData.category_in_competition.slice(1).toLowerCase().trim());

            } catch (error) {
                console.error('An error occurred while fetching the athlete.');
            }
        };

        if (open) {
            fetchAthletesData();
        }
    }, [open, idAth, idComp, usuarioSalvo.token]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Edit Athlete</DialogTitle>
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
                                         style={{marginRight: '1rem'}}/>
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
                            select
                            label="Real category"
                            value={realCategory}
                            onChange={handleRealCategory}
                            fullWidth
                        >
                            {categories.map((p) => (
                                <MenuItem key={p} value={p}>
                                    {p}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="Category in competition"
                            value={categoryInCompetition}
                            onChange={handleCategoryInCompetition}
                            fullWidth
                        >
                            {categories.map((p) => (
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
                            Athlete successfully edited!
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

export default EditAthlete;