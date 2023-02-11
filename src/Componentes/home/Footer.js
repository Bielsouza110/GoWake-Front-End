import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow
} from 'mdb-react-ui-kit';
import Rodape from "./Rodape";
import Typography from "@mui/material/Typography";

function Footer(){

    return (
        <MDBFooter bgColor='light' className='text-center text-lg-left'>
            <MDBContainer className='p-4'>
                <MDBRow>
                    <MDBCol lg='6' md='12' className='mb-4 mb-md-0' align="left">
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                marginBottom: 1,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.0rem',
                                color: '#808080',
                                textDecoration: 'none',
                                alignItems: 'center'
                            }}
                        >
                            IWWF
                        </Typography>

                        <p >
                            The International Waterski & Wakeboard Federation (IWWF) is the world governing body for all towed water sports. Founded in Geneva, Switzerland in 1946, it is recognized by the International Olympic Committee (IOC) as the sole authority governing all towed water sports and has 91 affiliated member federations worldwide.
                        </p>
                    </MDBCol>

                    <MDBCol lg='6' md='12' className='mb-4 mb-md-0' align="left">
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                marginBottom: 1,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.0rem',
                                color: '#808080',
                                textDecoration: 'none',
                                alignItems: 'center'
                            }}
                        >
                            Wakeboarding
                        </Typography>
                        <p>
                            Is a combination of waterskiing, snowboarding and surfing. Each rider is allowed 2 passes through the wakeboard course during which time they may perform any routine they choose. They will be judged on three subjective style categories: Execution, Intensity and Composition.
                        </p>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <Rodape/>
        </MDBFooter>

    );

}

export default Footer;