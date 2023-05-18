import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import {Row, Col} from "react-bootstrap";
import axios from "axios";
import {endpoints, getEndpointCompetitionById, getEndpointCreateAthlete} from "../../../../api/Urls";

const CreateAthlete = ({ open, onClose, data }) => {

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const handleCreate = async () => {
        const data = {
            events: [
                { id: 2 },
                { id: 1 }
            ],
            fed_id: "PT005",
            first_name: "Biel",
            last_name: "Souza",
            country: "ES",
            gender: "M",
            year_of_birth: 2000
        };

        console.log(data);

        try {
            /*idCompetition*/
            const response = await axios.post(getEndpointCreateAthlete("athlete", 47), data, {
                headers: {
                    Authorization: `Token ${usuarioSalvo.token}`,
                },
            });

            onClose();
        } catch (error) {
            console.log('Ocorreu um erro ao fazer a solicitação.');
        }


    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Create Athlete</DialogTitle>
            <DialogContent>
                <Row>
                    <Col>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Name"
                            value={name}
                            onChange={handleNameChange}
                            fullWidth
                        />
                    </Col>
                    <Col>
                        <TextField
                            margin="dense"
                            label="Age"
                            value={age}
                            onChange={handleAgeChange}
                            fullWidth
                        />
                    </Col>
                </Row>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Age"
                    value={age}
                    onChange={handleAgeChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
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