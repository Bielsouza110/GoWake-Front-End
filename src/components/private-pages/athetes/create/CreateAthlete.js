import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import {Row, Col} from "react-bootstrap";
import axios from "axios";
import {endpoints} from "../../../../api/Urls";

const CreateAthlete = ({ open, onClose, onCreate }) => {

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const handleCreate = () => {

        console.log(name, age);

        onCreate({ name, age });
        setName('');
        setAge('');
        onClose();
    };

    const handleSum = async () => {
        const data = {
            events: [
                { id: 2 },
                { id: 1 }
            ],
            fed_id: "PT004",
            first_name: "Joel",
            last_name: "Bernardino",
            country: "PT",
            gender: "M",
            year_of_birth: 2000
        };

        try {
            const response = await axios.post('https://mmonteiro.pythonanywhere.com/api/competition/47/athletes/', data, {
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
                <Button onClick={handleSum} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateAthlete;