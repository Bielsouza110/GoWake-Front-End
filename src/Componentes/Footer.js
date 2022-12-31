import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow
} from 'mdb-react-ui-kit';

function Footer(){

    return (
        <MDBFooter bgColor='light' className='text-center text-lg-left'>
            <MDBContainer className='p-4'>
                <MDBRow>
                    <MDBCol lg='6' md='12' className='mb-4 mb-md-0' align="left">
                        <h5 className='text-uppercase' >IWWF</h5>
                        <p >
                            The International Waterski & Wakeboard Federation (IWWF) is the world governing body for all towed water sports. Founded in Geneva, Switzerland in 1946, it is recognized by the International Olympic Committee (IOC) as the sole authority governing all towed water sports and has 91 affiliated member federations worldwide.
                        </p>
                    </MDBCol>

                    <MDBCol lg='6' md='12' className='mb-4 mb-md-0' align="left">
                        <h5 className='text-uppercase' >Wakeboarding </h5>
                        <p>
                            Is a combination of waterskiing, snowboarding and surfing. Each rider is allowed 2 passes through the wakeboard course during which time they may perform any routine they choose. They will be judged on three subjective style categories: Execution, Intensity and Composition.
                        </p>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a className='text-dark' href='https://mdbootstrap.com/'>
                    GoWake
                </a>
            </div>
        </MDBFooter>

    );

}

export default Footer;