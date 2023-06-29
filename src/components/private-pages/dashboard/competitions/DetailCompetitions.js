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
} from "@mui/material";
import ShareLocationOutlinedIcon from '@mui/icons-material/ShareLocationOutlined';
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import moment from 'moment';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import {Button} from '@mui/material';
import Athletes from "../../athetes/Athletes";
import Events from "../../events/Events";
import Officials from "../../officers/Officials";
import Leaderboard from "../../leaderboard/Leaderboard";
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
            case 4:
                return <Leaderboard idComp={id}/>;
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
        <div className="sdd" style={{marginTop: isMobile ? "-2vh" : "0.5vh"}}>
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
                                {/*<MenuItem onClick={() => {
                                    handleButtonHover(4); // Ativar o Item 3
                                    handleClose();
                                }}>Leaderboard</MenuItem>*/}
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

