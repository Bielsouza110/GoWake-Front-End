import {
    MDBContainer,
    MDBCol,
    MDBRow,
} from 'mdb-react-ui-kit';

import { useNavigate } from 'react-router-dom';
import AppBar from "../../../navs/AppBar";
import Box from "@mui/material/Box";
import {Container} from "@material-ui/core";
import React, {useRef, useState} from "react";
import axios from "axios";
import {endpoints} from "../../../api/Urls";
import DrawerHeader from "../../../navs/DrawerHeader";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function CreateAccount() {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const inputRef = useRef(null);
    const [showError, setShowError] = useState(false);
    const [showErrorUsername, setShowErrorUsername] = useState('');
    const [showErrorEmail, setShowErrorEmail] = useState('');
    const [showErrorPassword, setShowErrorPassword] = useState('');
    const [showErrorPassword2, setShowErrorPassword2] = useState('');
    const [user, setUser] = useState({ username: '', email: '', password: '', password2: '' });
    const [showPassword, setShowPassword] = useState(false);

    function handleChangeUsername(event) {
        setUser({ ...user, username: event.target.value });
    }
    function handleChangePassword(event) {
        setUser({ ...user, password: event.target.value });
    }
    function handleChangePassword2(event) {
        setUser({ ...user, password2: event.target.value });
    }
    function handleChangeEmail(event) {
        setUser({ ...user, email: event.target.value });
    }
    const createAccountApi = async (user) => {
        try {
            const response = await axios.post(endpoints.createAccount, user);

            if (user.password !== user.password2) {
                setShowError(true);
                setShowErrorPassword('Passwords do not match')
                setShowErrorPassword2('Passwords do not match')
                setTimeout(() => {
                    setShowError(false);
                }, 4000);
                return;
            }

            if (response.status === 201) {

                setShowError(false);


                console.log(response);

                setOpen(true);
                setTimeout(() => {
                    setShowError(false);
                    navigate('/');
                    setOpen(false);
                }, 3000);
            }

        } catch (error) {
            if (error.response.status === 400 || error.response.status === 404) {

                setShowErrorUsername(error.response.data.username)
                setShowErrorEmail(error.response.data.error)
                setShowErrorPassword(error.response.data.password)
                setShowErrorPassword2(error.response.data.password2)

                if (user.email === '') {
                    setShowError(true);
                    setShowErrorEmail('This field may not be blank.')
                    setTimeout(() => {
                        setShowError(false);
                    }, 4000);
                }

                if (user.password !== user.password2) {
                    setShowError(true);
                    setShowErrorPassword('Passwords do not match')
                    setShowErrorPassword2('Passwords do not match')
                    setTimeout(() => {
                        setShowError(false);
                    }, 4000);
                }

                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 4000);

                console.log(error.response);
            } else {
                // lidar com outros erros
                console.log(error);
            }
        }
    };
    function handleSubmit(event) {
        event.preventDefault();
        createAccountApi(user);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const meuBotao = document.getElementById('createAccount');
            if (meuBotao) {
                meuBotao.click(); // seleciona o botão se ele estiver definido
            }
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="sdd">
            <Box sx ={{display:"flex"}}>
                <AppBar/>
                <Container id="marginDrawerHeader">
                    <DrawerHeader/>
                    <MDBContainer id = "marginGlobal">
                        <MDBRow>
                            <MDBCol id="esconde" col='10' md='6'>
                                <img src="/images/wake.png" alt="Image login"/>
                            </MDBCol>
                            <MDBCol col='4' md='6'>
                                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px', fontSize:'30px'
                                }}>Join us</h5>

                                <Dialog open={open}>
                                    <DialogContent>
                                        <DialogContentText sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <HowToRegIcon sx={{ color: 'green', fontSize: 48, marginBottom: '1%' }}/>
                                            Registration successful!
                                        </DialogContentText>
                                    </DialogContent>
                                </Dialog>

                                <Grid item id="margin9">
                                    <TextField
                                        label="Username"
                                        value={user.username}
                                        onChange={handleChangeUsername}
                                        ref={inputRef}
                                        onKeyDown={handleKeyDown}
                                        fullWidth
                                    />
                                    {showError && showErrorUsername !== '' && <p id="error">{showErrorUsername}</p>}
                                </Grid>

                                <Grid item id="margin9">
                                    <TextField
                                        label="Email"
                                        value={user.email}
                                        onChange={handleChangeEmail}
                                        ref={inputRef}
                                        onKeyDown={handleKeyDown}
                                        type='email'
                                        size="md"
                                        fullWidth
                                    />
                                    {showError && showErrorEmail !== '' && <p id="error">{showErrorEmail}</p>}
                                </Grid>

                                <Grid item id="margin9">
                                    <TextField
                                        label="Password"
                                        value={user.password}
                                        onChange={handleChangePassword}
                                        type={showPassword ? 'text' : 'password'}
                                        size="md"
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleTogglePasswordVisibility}>
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    {showError && showErrorPassword !== '' && <p id="error">{showErrorPassword}</p>}
                                </Grid>

                                <Grid item id="margin10">
                                    <TextField
                                        label="Confirm password"
                                        value={user.password2}
                                        onChange={handleChangePassword2}
                                        ref={inputRef}
                                        onKeyDown={handleKeyDown}
                                        type={showPassword ? 'text' : 'password'}
                                        size="md"
                                        fullWidth
                                    />
                                    {showError && showErrorPassword2 !== '' && <p id="error">{showErrorPassword2}</p>}
                                </Grid>

                                <Button variant="contained" id="createAccount" ref={inputRef} onKeyDown={handleKeyDown} type="submit" onClick={handleSubmit} className="mb-2 w-100" size="md"
                                        style={{ textTransform: 'none', color: 'success' }}>
                                    Sign up
                                </Button>

                                <Button variant="contained" type="submit" onClick={() => navigate(-1)} className="mb-3 w-100" size="md" style={{ textTransform: 'none', backgroundColor: 'gray' }}>
                                    Cancel
                                </Button>

                                <div className="divider d-flex align-items-center" style={{ marginBottom: '2%' }}/>

                                <div className='d-flex flex-row justify-content-center'>
                                    <p id="fg" className="small text-muted me-1 fw-bold" >
                                        Already have an account? <a id="fgg" className="me-1 fw-bold" href="/">
                                        Sign in </a>
                                    </p>
                                </div>

                                <div className='d-flex flex-row justify-content-center'>
                                    <a id="tu" href="src/components/login/CreateAccount#" className="small text-muted me-1">Terms of use.</a>
                                    <a id="pp" href="src/components/login/CreateAccount#" className="small text-muted">Privacy policy</a>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </Container>
            </Box>
        </div>
    );
}

export default CreateAccount;