import {Col, Container, Row, Table} from "react-bootstrap";
import {MdOutlineKitesurfing} from "react-icons/md";
import {BiCategoryAlt} from "react-icons/bi";
import {BiCategory} from "react-icons/bi";
import {AiOutlineStop} from "react-icons/ai";
import AppBar from "../../login/AppBar/AppBar";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import DemoCarousel from "../DemoCarousel";
import Cards from "../Cards";
import Search from "../Search";
import Subscribe from "../Subscribe";
import Footer from "../Footer";
import Card from "react-bootstrap/Card";
import CardGroup from 'react-bootstrap/CardGroup';
import CollapsibleTable from "./TableEvent";
import SpacingGrid from "./GridTable";
import GridTable from "./GridTable";


function Event() {

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop:5,
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));


    return (
            <div className="sdd" id="tCards">
                <Box sx ={{display:"flex"}}>
                    <AppBar/>
                    <Container>
                        <DrawerHeader />
                        <h1>Circuit Hale'iwa Open <span style={{backgroundColor: 'green'}} className="dot"/></h1>
                        <h6 id="m">13 - 17 FEBRUARY 2023  - Mad William</h6>
                        <GridTable/>
                    </Container>
                </Box>
            </div>
    );

}

export default Event;