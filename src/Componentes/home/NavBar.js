import React, {Component} from "react";
import {Navbar, Nav, NavDropdown, Container, Form, FormControl, Button} from "react-bootstrap";
import {FiLogIn} from "react-icons/fi";
import {TbLivePhoto} from "react-icons/tb";
import {BsFileEarmarkRuled} from "react-icons/bs";

function NavBar() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <a className="navbar-brand" href="/">
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/International_Waterski_%26_Wakeboard_Federation_logo.svg/1200px-International_Waterski_%26_Wakeboard_Federation_logo.svg.png" width="100%" height="50" alt=""/>
                    </a>
                    <Navbar.Brand href="/">International Waterski & Wakeboard Federation</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav
                            className="ms-auto my-2 my-lg-0"
                            itemScope="right"
                            navbarScroll
                        >
                            <Nav.Link class="justify-content" href="#deet"> Live Results<TbLivePhoto/></Nav.Link>
                            <Nav.Link class="justify-content"
                                      href="https://iwwf.sport/wp-content/uploads/2022/05/IWWFWakeboardBoatRules-2022.pdf"> IWWF
                                Wakebord Rules<BsFileEarmarkRuled/></Nav.Link>
                            <Nav.Link class="justify-content" href="/login"> Login<FiLogIn/></Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse className="justify-content-end" >
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="#action2">Link</Nav.Link>
                            <NavDropdown title="Link" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#" disabled>
                                Link
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>*/}
        </div>
    );
}

export default NavBar;
