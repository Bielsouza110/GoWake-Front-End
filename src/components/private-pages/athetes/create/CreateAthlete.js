import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import {Row, Col} from "react-bootstrap";

const CreateAthlete = ({ open, onClose, onCreate }) => {
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