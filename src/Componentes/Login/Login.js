import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
} from 'mdb-react-ui-kit';
import {Button} from "react-bootstrap";
import {useHistory, useNavigate} from 'react-router-dom';
import AppBar from "../home/AppBar";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import DemoCarousel from "../home/DemoCarousel";
import Cards from "../home/Cards";
import Search from "../home/Search";
import Subscribe from "../home/Subscribe";
import Footer from "../home/Footer";
import {Container} from "@material-ui/core";

function Login() {
    const navigate = useNavigate();

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    /*const history = useHistory();*/
    useEffect(() => {

        if (localStorage.getItem("token")) {
            navigate("/login/dashboard")
        }
    }, [])

    async function login() {
        console.warn(username, password)
        let item = {username, password};
        let result = await fetch("https://gowake.daletech.pt/api/auth/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify(item)
        });

        result = await result.json();
        localStorage.setItem("token", JSON.stringify(result))
        navigate("/login/dashboard")
    }

    return (
            <div className="sdd">
                <Box sx ={{display:"flex"}}>
                    <AppBar/>
                    <Container>
                        <DrawerHeader />
                        <MDBContainer className="p-3 my-4">
                            <MDBRow>
                                <MDBCol id="esconde" col='10' md='6'>
                                    <img
                                        src="https://st2.depositphotos.com/1874273/9372/v/600/depositphotos_93724752-stock-illustration-athlete-on-board-glides-over.jpg"
                                        width="90%" height="90%" alt=""/>
                                </MDBCol>
                                <MDBCol col='4' md='6'>

                                    <h5 className="fw-normal my-4 pb-3" style={{
                                        letterSpacing: '1px', fontSize: '30px'
                                    }}>Sign into your account</h5>

                                    <MDBInput wrapperClass='mb-4' onChange={(e) => setUsername(e.target.value)}
                                              placeholder="Email adress" id='formControlLg' type='text'
                                              size="lg"/>
                                    <MDBInput wrapperClass='mb-4' onChange={(e) => setPassword(e.target.value)}
                                              placeholder="Password" id='formControlLg' type='password'
                                              size="lg"/>

                                    {/* <Button onClick={login} className="mb-4 w-100" size="lg">Sign
                                in</Button>*/}

                                    <Button onClick={() => navigate("/login/dashboard")} className="mb-4 w-100" size="lg">Sign
                                        in</Button>

                                    <div className="divider d-flex align-items-center my-4"/>

                                    <div className='d-flex flex-row justify-content-center'>
                                        <a id="fg" className="small text-muted me-1 fw-bold" href="#!">Forgot Password?</a>
                                        <a id="fg" className="small text-muted me-1 fw-bold" href="/createlogin">Create an
                                            Account</a>
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