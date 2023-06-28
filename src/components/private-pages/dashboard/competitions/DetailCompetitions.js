import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Box from "@mui/material/Box";
import Drawer from "../../../../navs/Drawer";
import {Container} from "@material-ui/core";
import DrawerHeader from "../../../../navs/DrawerHeader";
import {MDBContainer} from "mdb-react-ui-kit";
import Typography from "@mui/material/Typography";
import {getEndpointCompetitionById} from "../../../../api/Urls";
import {
    Divider,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {getCountryFlag, GetGenderFlags, handleMouseEnter, handleMouseLeave} from "../utils/Utils";
import ShareLocationOutlinedIcon from '@mui/icons-material/ShareLocationOutlined';
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import moment from 'moment';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import {Button} from '@mui/material';
import Athletes from "../../athetes/Athletes";
import Events from "../../events/Events";
import Officials from "../../officers/Officials";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import FestivalIcon from "@mui/icons-material/Festival";

function DetailCompetitions() {

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const [data, setData] = useState(null);
    const {id} = useParams();
    const [showSpinner, setShowSpinner] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMobile = useMediaQuery('(max-width: 600px)');

    useEffect(() => {
        axios.get(getEndpointCompetitionById("competitionsBy", id), {
            headers: {
                'Authorization': `Token ${usuarioSalvo.token}`
            }
        }).then(response => {
            setData(response.data);
        }).catch(error => {
            console.error(error);
        });

        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 3000); // Tempo limite de 3 segundos

        return () => clearTimeout(timer);
    }, []);

    const [activeButton, setActiveButton] = useState(1); // Definindo o Item 1 como ativo inicialmente
    const handleButtonHover = (index) => {
        setActiveButton(index);
    };
    const renderContent = () => {
        switch (activeButton) {
            case 1:
                return <Events idComp={id}/>;
            case 2:
                return <Athletes idComp={id}/>;
            case 3:
                return <Officials idComp={id}/>;
            default:
                return null;
        }
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="sdd" style={{marginTop: isMobile ? "-3vh" : "-0.5vh"}}>
            <Box sx={{display: "flex"}}>
                <Drawer/>
                <Container id="marginDrawerHeader">
                    <DrawerHeader/>
                    <MDBContainer className="p-1 my-2">

                        <Typography variant="h6" fontWeight="bold" className="my-3 pb-0" style={{fontSize: '20px'}}>
                            <IconButton color="inherit" aria-label="open drawer" onClick={handleClick} edge="start"
                                        sx={{marginRight: 0.5}}>
                                <Tooltip title="Menu"><MenuIcon/></Tooltip>
                            </IconButton>
                            Competition details
                        </Typography>

                        <div>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => {
                                    handleButtonHover(1); // Ativar o Item 1
                                    handleClose();
                                }}>Events</MenuItem>
                                <MenuItem onClick={() => {
                                    handleButtonHover(2); // Ativar o Item 2
                                    handleClose();
                                }}>Athletes</MenuItem>
                                <MenuItem onClick={() => {
                                    handleButtonHover(3); // Ativar o Item 3
                                    handleClose();
                                }}>Officials</MenuItem>
                            </Menu>
                        </div>

                        <div id="esconde"><Divider style={{backgroundColor: 'black', marginBottom: '3vh'}}/></div>

                        {data && (
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography id="margin3" variant="h6" fontWeight="bold" style={{fontSize: '16px'}}>
                                    <Tooltip
                                        title="Competition name">
                                        <FestivalIcon sx={{marginRight: '0.2em'}}/>
                                    </Tooltip> {data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase()}
                                </Typography>
                            </div>
                        )}


                        {data && (
                            <Typography id="margin3" variant="h6" fontWeight="bold" style={{fontSize: '16px'}}>
                                <Tooltip title="Start Date">
                                    <CalendarMonthIcon sx={{marginRight: '0.2em'}}/>
                                </Tooltip>
                                {data && data.beginning_date && moment(data.beginning_date).format('DD/MM/YYYY')}
                                <Tooltip title="Start Time">
                                    <WatchLaterOutlinedIcon sx={{marginLeft: 1, marginRight: '0.2em'}}/>
                                </Tooltip>
                                {data && data.beginning_date && moment(data.beginning_date).format('HH:mm')}
                            </Typography>
                        )}

                        {data && data.end_date && (
                            <Typography id="margin3" variant="h6" fontWeight="bold" style={{fontSize: '16px'}}>
                                <Tooltip title="End Date">
                                    <CalendarMonthIcon sx={{marginRight: '0.2em'}}/>
                                </Tooltip>
                                {moment(data.end_date).format('DD/MM/YYYY')}
                                <Tooltip title="End Time">
                                    <WatchLaterOutlinedIcon sx={{marginLeft: 1, marginRight: '0.2em'}}/>
                                </Tooltip>
                                {moment(data.end_date).format('HH:mm')}
                            </Typography>
                        )}

                        {data && (
                            <Typography id="margin3" variant="h6" fontWeight="bold" style={{fontSize: '16px'}}>
                                <Tooltip title="Discipline">
                                    <AutoAwesomeMotionOutlinedIcon sx={{marginRight: '0.3em'}}/>
                                </Tooltip>
                                {data.discipline.charAt(0).toUpperCase() + data.discipline.slice(1).toLowerCase()}
                            </Typography>
                        )}

                        {data && (
                            <Typography id="margin5" variant="h6" fontWeight="bold" style={{fontSize: '16px'}}>
                                <Tooltip title="Location">
                                    <ShareLocationOutlinedIcon sx={{marginRight: '0.3em'}}/>
                                </Tooltip>
                                {data.venue.charAt(0).toUpperCase() + data.venue.slice(1).toLowerCase()}
                            </Typography>
                        )}

                        {renderContent()} {/* Renderizar o conteúdo com base no item ativo */}
                    </MDBContainer>
                </Container>
            </Box>
        </div>
    );
}

export default DetailCompetitions;


{/*{data && (
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6}>

                                    <Typography variant="h6" id="margin4" fontWeight="bold" style={{
                                        fontSize: '16px'
                                    }}>Events</Typography>

                                    {data.events.length === 0 && showSpinner && (
                                            <div align="left">
                                                <Spinner id="load" animation="border" variant="secondary" size="3rem"/>
                                                <p id="load2">Loading...</p>
                                            </div>
                                    )}

                                    {data.events.length === 0 && !showSpinner && (
                                        <div align="left">
                                            <p id="error2">There are no events at the moment!</p>
                                        </div>
                                    )}

                                    {data.events.length !== 0 && (
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell id="esconde">Event class</TableCell>
                                                        <TableCell>Rounds</TableCell>
                                                        <TableCell>Code</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data.events.map((item) => (
                                                        <TableRow style={{cursor: 'pointer'}} key={item.id} onMouseEnter={handleMouseEnter}
                                                                  onMouseLeave={handleMouseLeave}>
                                                            <TableCell>
                                                                {item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}
                                                            </TableCell>
                                                            <TableCell
                                                                id="esconde">{item.event_class.charAt(0).toUpperCase() + item.event_class.slice(1).toLowerCase()}</TableCell>
                                                            <TableCell>{item.rounds}</TableCell>
                                                            <TableCell>{item.code}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )}

                                </Grid>


                                 Tabela 2
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" id="margin4" fontWeight="bold" style={{
                                        fontSize: '16px'
                                    }}>Athletes</Typography>

                                    {data.athletes.length === 0 && showSpinner && (
                                            <div align="left">
                                                <Spinner id="load" animation="border" variant="secondary" size="3rem"/>
                                                <p id="load2">Loading...</p>
                                            </div>
                                    )}

                                    {data.athletes.length === 0 && !showSpinner && (
                                        <div align="left">
                                            <p id="error2">There are no athletes at the moment!</p>
                                        </div>
                                    )}

                                    {data.athletes.length !== 0 && (

                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Nome</TableCell>
                                                        <TableCell>Country</TableCell>
                                                        <TableCell>Gender</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data.athletes.map((item) => (
                                                        <TableRow style={{cursor: 'pointer'}} key={item.id} onMouseEnter={handleMouseEnter}
                                                                  onMouseLeave={handleMouseLeave}>
                                                            <TableCell>
                                                                {item.first_name.charAt(0).toUpperCase() + item.first_name.slice(1).toLowerCase() + " " + item.last_name.charAt(0).toUpperCase() + item.last_name.slice(1).toLowerCase()}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Tooltip title={item.country}>
                                                                    {getCountryFlag(item.country)}
                                                                </Tooltip>
                                                            </TableCell>
                                                            <TableCell>
                                                                {item.gender === "F" && (
                                                                    <Tooltip title="Feminine" className="tooltip-gender">
                                                                        {GetGenderFlags(item.gender)}
                                                                    </Tooltip>
                                                                )}
                                                                {item.gender === "M" && (
                                                                    <Tooltip title="Masculine" className="tooltip-gender">
                                                                        {GetGenderFlags(item.gender)}
                                                                    </Tooltip>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )}
                                </Grid>

                                 Tabela 3
                                <Grid item xs={12} md={12}>
                                    <Typography variant="h6" id="margin4" fontWeight="bold" style={{
                                        fontSize: '16px'
                                    }}>Officials</Typography>

                                    {data.officials.length === 0 && showSpinner && (
                                        <div align="left">
                                            <Spinner id="load" animation="border" variant="secondary" size="3rem"/>
                                            <p id="load2">Loading...</p>
                                        </div>
                                    )}

                                    {data.officials.length === 0 && !showSpinner && (
                                        <div align="left">
                                            <p id="error2">There are no officials at the moment!</p>
                                        </div>
                                    )}

                                    {data.officials.length !== 0 && (

                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell id="esconde">Country</TableCell>
                                                        <TableCell >Qualification</TableCell>
                                                        <TableCell id="esconde">Position</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data.officials.map((item) => (
                                                        <TableRow style={{cursor: 'pointer'}} key={item.id} onMouseEnter={handleMouseEnter}
                                                                  onMouseLeave={handleMouseLeave}>
                                                            <TableCell>
                                                                {item.first_name.charAt(0).toUpperCase() + item.first_name.slice(1).toLowerCase() + " " + item.last_name.charAt(0).toUpperCase() + item.last_name.slice(1).toLowerCase()}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Tooltip title={item.country}>
                                                                    {getCountryFlag(item.country)}
                                                                </Tooltip>
                                                            </TableCell>
                                                            <TableCell>{item.position.charAt(0).toUpperCase() + item.position.slice(1).toLowerCase()}</TableCell>
                                                            <TableCell id="esconde">{item.qualification}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )}
                                </Grid>
                            </Grid>
                        )}*/
}
