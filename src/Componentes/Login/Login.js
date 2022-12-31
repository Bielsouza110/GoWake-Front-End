import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import {Button} from "react-bootstrap";
import NavBar from "../home/NavBar";

function Login() {
    return (
        <div>
            <NavBar/>
            <div id="bg1">
            <MDBContainer className="p-3 my-5">
                <MDBRow>
                    <MDBCol col='10' md='6'>
                        <img src="https://st2.depositphotos.com/1874273/9372/v/600/depositphotos_93724752-stock-illustration-athlete-on-board-glides-over.jpg"
                             width="100%" height="100%" alt=""/>

                    </MDBCol>
                    <MDBCol col='4' md='6'>

                        <div className='d-flex flex-row mt-2'>
                                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/International_Waterski_%26_Wakeboard_Federation_logo.svg/1200px-International_Waterski_%26_Wakeboard_Federation_logo.svg.png"
                                     width="30%" height="50%" alt=""/>
                        </div>
                        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px', fontSize:'30px'
                        }}>Sign into your account</h5>


                        <MDBInput wrapperClass='mb-4' placeholder="Email adress" id='formControlLg' type='email' size="lg"/>
                        <MDBInput wrapperClass='mb-4' placeholder="Password" id='formControlLg' type='password' size="lg"/>

                        <Button className="mb-4 w-100" size="lg">Sign in</Button>

                        <div className="divider d-flex align-items-center my-4"/>

                        <div className='d-flex flex-row justify-content-center'>
                            <a id="fg" className="small text-muted me-1 fw-bold" href="#!">Forgot password?</a>
                        </div>

                        <div className='d-flex flex-row justify-content-center'>
                            <a id="tu" href="#" className="small text-muted me-1">Terms of use.</a>
                            <a id="pp" href="#" className="small text-muted">Privacy policy</a>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            </div>
        </div>
    );
}

export default Login;