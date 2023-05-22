import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
} from 'mdb-react-ui-kit';
import {useNavigate} from 'react-router-dom';
import AppBar from "../../../navs/AppBar";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Container} from "@material-ui/core";
import axios from 'axios';
import {endpoints} from "../../../api/Urls";
import DrawerHeader from "../../../navs/DrawerHeader";
import React, { useRef } from 'react';
import {Grid, TextField} from "@mui/material";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DoneIcon from '@mui/icons-material/Done';

function Login() {

    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [showError, setShowError] = useState(false);
    const [showRecoverPassword, setRecoverPassword] = useState(false);
    const [user, setUser] = useState({ username: '', password: '' , email: ''});

    function handleChangeUsername(event) {
        setUser({ ...user, username: event.target.value });
    }
    function handleChangePassword(event) {
        setUser({ ...user, password: event.target.value });
    }
    function handleChangeEmail(event) {
        setUser({ ...user, email: event.target.value });
    }
    const loginApi = async (user) => {
        try {
            const response = await axios.post(endpoints.login, user);
            localStorage.setItem('usuario', JSON.stringify(response.data));

            setOpen(true);
            setTimeout(() => {
                navigate('/login/dashboard');
                setOpen(false);
            }, 3000);

        } catch (error) {
            if (error.response.status === 400 || error.response.status === 404) {

                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 2000);

            } else {
                // lidar com outros erros
                console.log(error);
            }
        }
    };
    function handleSubmit(event) {
        event.preventDefault();
        loginApi(user);
    }
    function handleSubmitRecoverPassword(event){
        event.preventDefault();
    }
    function recoverPassword(event) {
        event.preventDefault();

        if (showRecoverPassword) {
            setRecoverPassword(false);
        } else {
            setRecoverPassword(true);
        }
    }

    useEffect(() => {
        localStorage.clear();
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const meuBotao = document.getElementById('login');
            if (meuBotao) {
                meuBotao.click(); // seleciona o botão se ele estiver definido
            }
        }
    };

    const [open, setOpen] = useState(false);

    return (
        <div className="sdd">
            <Box sx={{display: "flex"}}>
                <AppBar/>
                <Container id="marginDrawerHeader">
                    <DrawerHeader/>
                    <MDBContainer className="p-3 my-4">
                        <MDBRow>
                            <MDBCol id="esconde" col='10' md='6'>
                                <img src="/images/wake.png" alt="Image login" />
                            </MDBCol>
                            <MDBCol col='4' md='6'>

                                <h5 className="fw-normal my-4 pb-3" style={{
                                    letterSpacing: '1px', fontSize: '30px'
                                }}>Sign into your account</h5>

                                <Dialog open={open}>
                                    <DialogContent>
                                        <DialogContentText sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <DoneIcon sx={{ color: 'green', fontSize: 48, marginBottom: '1%' }} />
                                            Login successful!
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
                                </Grid>
                                <Grid item id="margin10">
                                    <TextField
                                        label="Password"
                                        value={user.password}
                                        onChange={handleChangePassword}
                                        ref={inputRef}
                                        onKeyDown={handleKeyDown}
                                        type='password'
                                        size="md"
                                        fullWidth
                                    />
                                </Grid>

                                {showError && <p id="error">Wrong credentials</p>}

                                <Button id="login" variant="contained" type="submit" onClick={handleSubmit} className="mb-4 w-100" size="md"
                                        style={{ textTransform: 'none', color: 'success' }}>
                                    Sign in
                                </Button>

                                {showRecoverPassword && <div className="divider d-flex align-items-center" style={{ marginBottom: '2%' }}/>}

                                {showRecoverPassword &&
                                    <Grid item id="margin10">
                                        <TextField
                                            label="Enter email to recover password"
                                            value={user.email}
                                            onChange={handleChangeEmail}
                                            /*    ref={inputRef}
                                                onKeyDown={handleKeyDown}*/
                                            type='email'
                                            size="md"
                                            fullWidth
                                        />
                                    </Grid>
                                }

                                {showRecoverPassword &&
                                    <Button variant="contained" type="submit" onClick={handleSubmit} className="mb-3 w-100" size="md" style={{ textTransform: 'none', backgroundColor: 'gray' }}>
                                        Cancel
                                    </Button>
                                }

                                <div className="divider d-flex align-items-center" style={{ marginBottom: '2%' }}/>

                                <div className='d-flex flex-row justify-content-center'>
                                    <a id="fg" className="small text-muted me-1 fw-bold" href="#" onClick={recoverPassword}>Forgot Password?</a>
                                    <a id="fg" className="small text-muted me-1 fw-bold" href="/createlogin">Create an Account</a>
                                </div>

                                <div className='d-flex flex-row justify-content-center'>
                                    <a id="tu" href="#" className="small text-muted me-1">Terms of use.</a>
                                    <a id="pp" href="#" className="small text-muted">Privacy policy</a>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </Container>
            </Box>
        </div>
    );
}

export default Login;