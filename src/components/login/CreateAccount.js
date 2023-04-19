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
import {useState} from "react";
import axios from "axios";

function CreateAccount() {

    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [showErrorUsername, setShowErrorUsername] = useState('');
    const [showErrorEmail, setShowErrorEmail] = useState('');
    const [showErrorPassword, setShowErrorPassword] = useState('');
    const [showErrorPassword2, setShowErrorPassword2] = useState('');
    const [showSucessMessage, setShowSucessMessage] = useState('');


    const [user, setUser] = useState({ username: '', email: '', password: '', password2: '' });

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

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

    function handleSubmit(event) {
        event.preventDefault();

        axios.post('https://mmonteiro.pythonanywhere.com/account/register/', user)
            .then(response => {

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

                /*navigate('/login/dashboard', { state: userResponse });*/
            })
            .catch(error => {
                if (error.response.status === 400) {

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
            });
    }

    return (

        <div className="sdd">
            <Box sx ={{display:"flex"}}>
                <AppBar/>
                <Container>
                    <DrawerHeader />
                    <MDBContainer className="p-3 my-4 mg">
                        <MDBRow>
                            <MDBCol id="esconde" col='10' md='6'>
                                <img src="https://st2.depositphotos.com/1874273/9372/v/600/depositphotos_93724752-stock-illustration-athlete-on-board-glides-over.jpg"
                                     width="90%" height="90%" alt=""/>
                            </MDBCol>
                            <MDBCol col='4' md='6'>
                                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px', fontSize:'30px'
                                }}>Join us</h5>

                                <MDBInput wrapperClass='mb-4' value={user.username} onChange={handleChangeUsername}
                                placeholder="Username" id='formControlLg' type='text' size="lg"/>

                                {showError && showErrorUsername !== '' && <p id="error">{showErrorUsername}</p>}

                                <MDBInput wrapperClass='mb-4' value={user.email} onChange={handleChangeEmail}
                                placeholder="Email adress" id='formControlLg' type='email' size="lg"/>

                                {showError && showErrorEmail !== '' && <p id="error">{showErrorEmail}</p>}

                                <MDBInput wrapperClass='mb-4' value={user.password} onChange={handleChangePassword}
                                placeholder="Password" id='formControlLg' type='password' size="lg"/>

                                {showError && showErrorPassword !== '' && <p id="error">{showErrorPassword}</p>}

                                <MDBInput wrapperClass='mb-4' value={user.password2} onChange={handleChangePassword2}
                                placeholder="Confirm password" id='formControlLg' type='password' size="lg"/>

                                {showError && showErrorPassword2 !== '' && <p id="error">{showErrorPassword2}</p>}
                                {!showError && showSucessMessage !== '' && <p id="sucess">{showSucessMessage}</p>}

                                <Button type="submit" onClick={handleSubmit} className="mb-3 w-100" size="lg">Sign Up</Button>
                                <Button onClick={() => navigate(-1)} id="colorBTN" className="mb-4 w-100" size="lg">Cancel</Button>

                                <div className="divider d-flex align-items-center my-4"/>

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