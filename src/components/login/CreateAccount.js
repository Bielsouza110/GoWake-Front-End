import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
} from 'mdb-react-ui-kit';

import {Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import AppBar from "../../navs/AppBar";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import {Container} from "@material-ui/core";
import React, {useRef, useState} from "react";
import axios from "axios";
import {endpoints} from "../../api/Urls";
import DrawerHeader from "../../navs/DrawerHeader";

function CreateAccount() {

    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [showError, setShowError] = useState(false);
    const [showErrorUsername, setShowErrorUsername] = useState('');
    const [showErrorEmail, setShowErrorEmail] = useState('');
    const [showErrorPassword, setShowErrorPassword] = useState('');
    const [showErrorPassword2, setShowErrorPassword2] = useState('');
    const [showSucessMessage, setShowSucessMessage] = useState('');


    const [user, setUser] = useState({ username: '', email: '', password: '', password2: '' });

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
                setShowSucessMessage(response.data.response)

                console.log(response);

                setTimeout(() => {
                    setShowError(false);
                    navigate('/');
                }, 4000);
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

    return (

        <div className="sdd">
            <Box sx ={{display:"flex"}}>
                <AppBar/>
                <Container id="marginDrawerHeader">
                    <DrawerHeader/>
                    <MDBContainer className="p-3 my-4 mg">
                        <MDBRow>
                            <MDBCol id="esconde" col='10' md='6'>
                                <img src="/images/wake.png" alt="Image login"/>
                            </MDBCol>
                            <MDBCol col='4' md='6'>
                                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px', fontSize:'30px'
                                }}>Join us</h5>

                                <MDBInput wrapperClass='mb-4' ref={inputRef} onKeyDown={handleKeyDown} value={user.username} onChange={handleChangeUsername}
                                placeholder="Username" id='formControlLg' type='text' size="md"/>

                                {showError && showErrorUsername !== '' && <p id="error">{showErrorUsername}</p>}

                                <MDBInput wrapperClass='mb-4' ref={inputRef} onKeyDown={handleKeyDown} value={user.email} onChange={handleChangeEmail}
                                placeholder="Email adress" id='formControlLg' type='email' size="md"/>

                                {showError && showErrorEmail !== '' && <p id="error">{showErrorEmail}</p>}

                                <MDBInput wrapperClass='mb-4' ref={inputRef} onKeyDown={handleKeyDown} value={user.password} onChange={handleChangePassword}
                                placeholder="Password" id='formControlLg' type='password' size="md"/>

                                {showError && showErrorPassword !== '' && <p id="error">{showErrorPassword}</p>}

                                <MDBInput wrapperClass='mb-4' ref={inputRef} onKeyDown={handleKeyDown} value={user.password2} onChange={handleChangePassword2}
                                placeholder="Confirm password" id='formControlLg' type='password' size="md"/>

                                {showError && showErrorPassword2 !== '' && <p id="error">{showErrorPassword2}</p>}
                                {!showError && showSucessMessage !== '' && <p id="sucess">{showSucessMessage}</p>}

                                <Button type="submit" id="createAccount" ref={inputRef} onKeyDown={handleKeyDown} onClick={handleSubmit} className="mb-3 w-100" size="md">Sign Up</Button>
                                <Button onClick={() => navigate(-1)} id="colorBTN" className="mb-4 w-100" size="md">Cancel</Button>

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