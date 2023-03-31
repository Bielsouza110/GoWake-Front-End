import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
} from 'mdb-react-ui-kit';

import {Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import AppBar from "../AppBar/AppBar";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import {Container} from "@material-ui/core";

function CreateAccount() {
    const navigate = useNavigate();

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));


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

                                <MDBInput wrapperClass='mb-4' placeholder="Email adress" id='formControlLg' type='email' size="lg"/>
                                <MDBInput wrapperClass='mb-4' placeholder="Password" id='formControlLg' type='password' size="lg"/>
                                <MDBInput wrapperClass='mb-4' placeholder="Confirm password" id='formControlLg' type='password' size="lg"/>
                                <MDBInput wrapperClass='mb-4' placeholder="Insert invate code" id='formControlLg' type='email' size="lg"/>

                                <Button className="mb-3 w-100" size="lg">Sign Up</Button>
                                <Button onClick={() => navigate(-1)} id="colorBTN" className="mb-4 w-100" size="lg">Cancel</Button>

                                <div className="divider d-flex align-items-center my-4"/>

                                <div className='d-flex flex-row justify-content-center'>
                                    <p id="fg" className="small text-muted me-1 fw-bold" >
                                        Already have an account? <a id="fgg" className="me-1 fw-bold" href="/login">
                                        Sign in </a>
                                    </p>
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

export default CreateAccount;