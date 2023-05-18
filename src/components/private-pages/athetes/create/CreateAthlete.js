import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Grid, Select, InputLabel, FormControl, Input, Chip } from '@mui/material';
import axios from "axios";
import { endpoints, getEndpointCompetitionById, getEndpointCreateAthlete } from "../../../../api/Urls";
import {getAllGenderFlags} from "../../dashboard/utils/Utils";

const CreateAthlete = ({ open, onClose, data }) => {
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const [age, setAge] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fedId, setFedId] = useState('');
    const [gender, setGender] = useState('');
    const [yearOfBirth, setYearOfBirth] = useState('');
    const [selectedEvents, setSelectedEvents] = useState([]); // Estado para armazenar os eventos selecionados

    const handleAgeChange = (event) => {
        setAge(event.target.value);
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
        setYearOfBirth(event.target.value);
    };

    const handleCreate = async () => {
        const data = {
            events: selectedEvents, // Usando os eventos selecionados
            fed_id: fedId,
            first_name: firstName,
            last_name: lastName,
            country: country,
            gender: gender,
            year_of_birth: yearOfBirth
        };

        console.log(data);

        try {
            const response = await axios.post(getEndpointCreateAthlete("athlete", 47), data, {
                headers: {
                    Authorization: `Token ${usuarioSalvo.token}`,
                },
            });

            // Clearing the fields
            setFedId('');
            setFirstName('');
            setLastName('');
            setCountry('');
            setGender('');
            setYearOfBirth('');
            setSelectedEvents([]);

            onClose();
        } catch (error) {
            console.log('Ocorreu um erro ao fazer a solicitação.');
        }
    }

    const getYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const yearOptions = [];
        for (let year = currentYear; year >= 1930; year--) {
            yearOptions.push(year);
        }
        return yearOptions;
    };

    const [events, setEvents] = useState([]);

    const handleEventChange = (event) => {
        setSelectedEvents(event.target.value); // Armazenando as opções selecionadas nos eventos
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(endpoints.competitions, {
                    headers: {
                        Authorization: `Token ${usuarioSalvo.token}`,
                    },
                });
                setEvents(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvents();
    }, []);

    const [country, setCountry] = useState('');

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const countryCodeMatrix = [
        'af', 'al', 'dz', 'as', 'ad', 'ao', 'ai', 'aq', 'ag', 'ar',
        'am', 'aw', 'au', 'at', 'az', 'bs', 'bh', 'bd', 'bb', 'by',
        'be', 'bz', 'bj', 'bm', 'bt', 'bo', 'ba', 'bw', 'bv', 'br',
        'io', 'bn', 'bg', 'bf', 'bi', 'kh', 'cm', 'ca', 'cv', 'ky',
        'cf', 'td', 'cl', 'cn', 'cx', 'cc', 'co', 'km', 'cg', 'cd',
        'ck', 'cr', 'ci', 'hr', 'cu', 'cy', 'cz', 'dk', 'dj', 'dm',
        'do', 'ec', 'eg', 'sv', 'gq', 'er', 'ee', 'et', 'fk', 'fo',
        'fj', 'fi', 'fr', 'gf', 'pf', 'tf', 'ga', 'gm', 'ge', 'de',
        'gh', 'gi', 'gr', 'gl', 'gd', 'gp', 'gu', 'gt', 'gn', 'gw',
        'gy', 'ht', 'hm', 'va', 'hn', 'hk', 'hu', 'is', 'in', 'id',
        'ir', 'iq', 'ie', 'il', 'it', 'jm', 'jp', 'jo', 'kz', 'ke',
        'ki', 'kp', 'kr', 'kw', 'kg', 'la', 'lv', 'lb', 'ls', 'lr',
        'ly', 'li', 'lt', 'lu', 'mo', 'mk', 'mg', 'mw', 'my', 'mv',
        'ml', 'mt', 'mh', 'mq', 'mr', 'mu', 'yt', 'mx', 'fm', 'md',
        'mc', 'mn', 'ms', 'ma', 'mz', 'mm', 'na', 'nr', 'np', 'nl',
        'an', 'nc', 'nz', 'ni', 'ne', 'ng', 'nu', 'nf', 'mp', 'no',
        'om', 'pk', 'pw', 'pa', 'pg', 'py', 'pe', 'ph', 'pn', 'pl',
        'pt', 'pr', 'qa', 're', 'ro', 'ru', 'rw', 'sh', 'kn', 'lc',
        'pm', 'vc', 'ws', 'sm', 'st', 'sa', 'sn', 'sc', 'sl', 'sg',
        'sk', 'si', 'sb', 'so', 'za', 'gs', 'es', 'lk', 'sd', 'sr',
        'sj', 'sz', 'se', 'ch', 'sy', 'tw', 'tj', 'tz', 'th', 'tl',
        'tg', 'tk', 'to', 'tt', 'tn', 'tr', 'tm', 'tc', 'tv', 'ug',
        'ua', 'ae', 'gb', 'us', 'um', 'uy', 'uz', 'vu', 've', 'vn',
        'vg', 'vi', 'wf', 'eh', 'ye', 'zm', 'zw'];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Create Athlete</DialogTitle>
            <DialogContent>
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
                                <MenuItem key={code} value={code}>
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
                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <InputLabel>Events</InputLabel>
                            <Select
                                multiple
                                value={selectedEvents} // Use o estado para armazenar os eventos selecionados
                                onChange={handleEventChange} // Função para lidar com a mudança dos eventos selecionados
                                input={<Input />}
                                renderValue={(selected) => (
                                    <div>
                                        {selected.map((value) => {
                                            const event = events.find((event) => event.id === value);
                                            return (
                                                <Chip key={value} label={event ? event.name : ""} style={{ marginRight: 5 }} />
                                            );
                                        })}
                                    </div>
                                )}
                            >
                                {events.map((event) => (
                                    <MenuItem key={event.id} value={event.id}>
                                        {event.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    // Clearing the fields
                    setFedId('');
                    setFirstName('');
                    setLastName('');
                    setCountry('');
                    setGender('');
                    setYearOfBirth('');
                    setSelectedEvents([]);

                    onClose();
                }} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {
                    // Clearing the fields
                    setFedId('');
                    setFirstName('');
                    setLastName('');
                    setCountry('');
                    setGender('');
                    setYearOfBirth('');
                    setSelectedEvents([]);

                    handleCreate();
                }} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateAthlete;
