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
import {
    endpoints,
    getEndpointAthleteById,
    getEndpointCreateAthlete,
    getEndpointDeleteAthleteById, putEndpointAthleteById
} from "../../../../api/Urls";

const EditAthlete = ({open, onClose, id}) => {
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fedId, setFedId] = useState('');
    const [gender, setGender] = useState('');
    const [yearOfBirth, setYearOfBirth] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(''); // Estado para armazenar os eventos selecionados
    const [dataCompetition, setDataCompetition] = useState([]);
    const [events, setEvents] = useState([]);
    const [country, setCountry] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    countryCodeMatrix.sort();
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
    const handleEventChange = (event) => {
        setSelectedEvent(event.target.value); // Armazenando as opções selecionadas nos eventos
    };
    const submitEditAthlete = async (competitionId) => {

        const data = {
            events: [],
            fed_id: fedId.toUpperCase().trim(),
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            country: country.toUpperCase().trim(),
            gender: gender.trim(),
            year_of_birth: parseInt(yearOfBirth.trim()),
        };

        try {
            const response = await axios.put(putEndpointAthleteById("athleteBy", competitionId, id), data, {
                headers: {
                    Authorization: `Token ${usuarioSalvo.token}`,
                },
            });
            onClose();
        } catch (error) {
            console.error('Erro ao buscar atletas:', error.request.response);
        }
    };
    const handleEdit = async () => {
        if (isFormEmpty()) {
            setErrorMessage('All fields above are required!');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        } else {
            try {
                const competitionIds = dataCompetition
                    .filter((competition) =>
                        competition.events.some((event) => event.id === selectedEvent)
                    )
                    .map((competition) => competition.id);

                if (competitionIds.length > 0) {
                    setSuccessDialogOpen(true);
                    for (const competitionId of competitionIds) {
                        await submitEditAthlete(competitionId);
                    }

                    setTimeout(() => {
                        cleanFieldsAndClose();
                    }, 3000);
                    onClose();
                } else {
                    console.error('No competitions found with the selected event.');
                }
            } catch (error) {
                console.error('An error occurred while making the request.');
            }
        }
    };

    const cleanFieldsAndClose = () => {
        setSuccessDialogOpen(false);
    };
    const isFormEmpty = () => {
        if (
            firstName.trim() === '' ||
            lastName.trim() === '' ||
            fedId.trim() === '' ||
            gender.trim() === '' ||
            yearOfBirth.trim() === '' ||
            country.trim() === '' ||
            selectedEvent.length === 0
        ) {
            return true; // Form is empty
        }
        return false; // Form is not empty
    };

    useEffect(() => {
        const fetchAthleteData = async () => {

            try {
                const athleteId = id;

                const competitionIds = dataCompetition
                    .filter(competition => competition.athletes.some(athlete => athlete.id === athleteId))
                    .map(competition => competition.id);

                console.log(competitionIds); // Output: [1, 3]

                competitionIds.forEach(competitionId => {
                    axios.get(getEndpointAthleteById("athleteBy", competitionId, athleteId), {
                        headers: {
                            'Authorization': `Token ${usuarioSalvo.token}`
                        }
                    }).then(response => {
                        const athleteData = response.data;
                        setFirstName(athleteData.first_name);
                        setLastName(athleteData.last_name);
                        setFedId(athleteData.fed_id);
                        setGender(athleteData.gender);
                        setYearOfBirth(String(athleteData.year_of_birth));
                        setSelectedEvent(''); // Set the selected event to an appropriate initial value
                        setCountry(String(athleteData.country.toLowerCase()));
                    }).catch(error => {
                        console.error('An error occurred while fetching athlete data:', error);
                    });
                });
            } catch (error) {
                console.error('An error occurred while fetching athlete data:', error);
            }
        };

        const fetchEvents = async () => {
            try {
                const response = await axios.get(endpoints.competitions, {
                    headers: {
                        'Authorization': `Token ${usuarioSalvo.token}`
                    },
                });

                setDataCompetition(response.data.results);
                setEvents(response.data.results.map(item => item.events).flat());
            } catch (error) {
                console.error('An error occurred while fetching events:', error);
            }
        };

        fetchEvents();
        fetchAthleteData();
    }, [id, usuarioSalvo.token]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Edit Athlete</DialogTitle>
            <DialogContent>
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
                    <Grid item xs={12} sm={12}>
                        <TextField
                            label="Event"
                            value={selectedEvent}
                            onChange={handleEventChange}
                            fullWidth
                            select
                        >
                            {events.map((event) => (
                                <MenuItem key={event.id} value={event.id}>
                                    {event.name.charAt(0).toUpperCase() + event.name.slice(1).toLowerCase()}
                                </MenuItem>
                            ))}
                        </TextField>

                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <div align="right">
                            {errorMessage && (
                                <p id="error">{errorMessage}</p>
                            )}
                        </div>
                    </Grid>
                </Grid>
                <Dialog open={successDialogOpen} onClose={cleanFieldsAndClose}>
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
                        cleanFieldsAndClose();
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
