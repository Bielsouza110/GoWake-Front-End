import NavBar from "../NavBar";
import {Col, Row, Table} from "react-bootstrap";
import {MdOutlineKitesurfing} from "react-icons/md";
import {BiCategoryAlt} from "react-icons/bi";
import {BiCategory} from "react-icons/bi";
import {AiOutlineStop} from "react-icons/ai";

function Event() {
    return (
        <div>
            <NavBar/>
            <div id="tCards">


                <h1>Circuito Surf Contest</h1>
                <h6 id="m">22 - 23 APRIL 2023 <span className="li">LIVE</span> - Mad William</h6>

                <Row>
                    <Col lg='6' md='12' className='mb-4 mb-md-0' align="left">
                        <Table>
                            <thead>
                            <tr>
                                <th>Category</th>
                                <th>Athletes</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><BiCategoryAlt color="gray"/> Under 9 Boys</td>
                                <td>
                                    <p>
                                        <MdOutlineKitesurfing color="black"/> Felipe Silva
                                    </p>
                                    <p>
                                        <MdOutlineKitesurfing color="Green"/> Joel Sacramento
                                    </p>
                                    <p>
                                    <MdOutlineKitesurfing color="gray"/> Pedro Antonio
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg='6' md='12' className='mb-4 mb-md-0' align="left">
                        <Table>
                            <thead>
                            <tr>
                                <th>Category</th>
                                <th>Athletes</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><BiCategory color="gray" /> Under 9 Girls</td>
                                <td>
                                    <p>
                                        <MdOutlineKitesurfing color="orange"/> Gisele Model
                                    </p>
                                    <p>
                                        <MdOutlineKitesurfing color="purple"/> Felipa Cristina
                                    </p>
                                    <p>
                                        <MdOutlineKitesurfing color="Brown"/> Micaela Kross
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <br/>

                <Row>
                    <Col lg='6' md='12' className='mb-4 mb-md-0' align="left">
                        <Table>
                            <thead>
                            <tr>
                                <th>Category</th>
                                <th>Athletes</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><BiCategoryAlt color="Turquoise"/> 10 - 14 Boys</td>
                                <td>
                                    <p>
                                        <MdOutlineKitesurfing color="black"/> Felipe Silva
                                    </p>
                                    <p>
                                        <MdOutlineKitesurfing color="Green"/> Joel Sacramento
                                    </p>
                                    <p>
                                        <MdOutlineKitesurfing color="gray"/> Pedro Antonio
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg='6' md='12' className='mb-4 mb-md-0' align="left">
                        <Table>
                            <thead>
                            <tr>
                                <th>Category</th>
                                <th>Athletes</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><BiCategory color="Turquoise" /> 10 - 14 Girls</td>
                                <td>
                                    <p>
                                        <MdOutlineKitesurfing color="orange"/> Gisele Model
                                    </p>
                                    <p>
                                        <MdOutlineKitesurfing color="purple"/> Felipa Cristina
                                    </p>
                                    <p>
                                        <MdOutlineKitesurfing color="Brown"/> Micaela Kross
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <br/>

                <Row>
                    <Col lg='6' md='12' className='mb-4 mb-md-0' align="left">
                        <Table>
                            <thead>
                            <tr>
                                <th>Category</th>
                                <th>Athletes</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><BiCategoryAlt color="Salmon"/> Junior Men</td>
                                <td>
                                    <p>
                                        <AiOutlineStop color="black"/> No athletes
                                    </p>

                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg='6' md='12' className='mb-4 mb-md-0' align="left">
                        <Table>
                            <thead>
                            <tr>
                                <th>Category</th>
                                <th>Athletes</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><BiCategory color="Salmon" /> Junior Women</td>
                                <td>
                                    <p>
                                        <MdOutlineKitesurfing color="orange"/> Gisele Model
                                    </p>
                                    <p>
                                        <MdOutlineKitesurfing color="purple"/> Felipa Cristina
                                    </p>
                                    <p>
                                        <MdOutlineKitesurfing color="Brown"/> Micaela Kross
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col lg='6' md='12' className='mb-4 mb-md-0' align="left">
                        <Table>
                            <thead>
                            <tr>
                                <th>Category</th>
                                <th>Athletes</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><BiCategoryAlt color="Teal"/> Open Men</td>
                                <td>
                                    <p>
                                        <MdOutlineKitesurfing color="black"/> Felipe Silva
                                    </p>
                                    <p>
                                        <MdOutlineKitesurfing color="Green"/> Joel Sacramento
                                    </p>
                                    <p>
                                        <MdOutlineKitesurfing color="gray"/> Pedro Antonio
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg='6' md='12' className='mb-4 mb-md-0' align="left">
                        <Table>
                            <thead>
                            <tr>
                                <th>Category</th>
                                <th>Athletes</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><BiCategory color="Teal" /> Open Women</td>
                                <td>
                                    <p>
                                        <MdOutlineKitesurfing color="orange"/> Gisele Model
                                    </p>
                                    <p>
                                        <MdOutlineKitesurfing color="purple"/> Felipa Cristina
                                    </p>
                                    <p>
                                        <MdOutlineKitesurfing color="Brown"/> Micaela Kross
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <br/>

                <Row>
                    <Col lg='6' md='12' className='mb-4 mb-md-0' align="left">
                        <Table>
                            <thead>
                            <tr>
                                <th>Category</th>
                                <th>Athletes</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><BiCategoryAlt color="Lime"/> Masters Men</td>
                                <td>
                                    <p>
                                        <AiOutlineStop color="black"/> No athletes
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg='6' md='12' className='mb-4 mb-md-0' align="left">
                        <Table>
                            <thead>
                            <tr>
                                <th>Category</th>
                                <th>Athletes</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><BiCategory color="Lime" /> Masters Women</td>
                                <td>
                                    <p>
                                        <AiOutlineStop color="black"/> No athletes
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col lg='6' md='12' className='mb-4 mb-md-0' align="left">
                        <Table>
                            <thead>
                            <tr>
                                <th>Category</th>
                                <th>Athletes</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><BiCategoryAlt color="orange"/> Veteran Men</td>
                                <td>
                                    <p>
                                        <AiOutlineStop color="black"/> No athletes
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg='6' md='12' className='mb-4 mb-md-0' align="left">
                        <Table>
                            <thead>
                            <tr>
                                <th>Category</th>
                                <th>Athletes</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><BiCategory color="orange" /> Veteran Women</td>
                                <td>
                                    <p>
                                        <AiOutlineStop color="black"/> No athletes
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </div>
    );

}

export default Event;