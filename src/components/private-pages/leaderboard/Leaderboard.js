import React, {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import {MDBContainer} from "mdb-react-ui-kit";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Divider} from "@mui/material";
import axios from "axios";
import {GetGenderFlags, handleMouseEnter, handleMouseLeave} from "../dashboard/utils/Utils";
import {getEndpointLeaderboard} from "../../../api/Urls";
import {Spinner} from "react-bootstrap";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
const Leaderboard = ({idComp}) => {

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));
    const [data, setData] = useState(null);
    const [showSpinner, setShowSpinner] = useState(true);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const fetchLeaderboard = async () => {
        const timer = setTimeout(() => {setShowSpinner(false);}, 3000); // Tempo limite de 3 segundos

        axios.get(getEndpointLeaderboard("leaderboard", idComp), {
            headers: {'Authorization': `Token ${usuarioSalvo.token}`}
        }).then(response => {
            console.log(response.data.results);
            setData(response.data.results);


        }).catch(error => {
            console.error(error);
        });

        return () => clearTimeout(timer);
    };
    const reload = () => {

        fetchLeaderboard();

        const timer = setTimeout(() => {setShowSpinner(false);}, 3000); // Tempo limite de 3 segundos
        return () => clearTimeout(timer);
    }

    useEffect(() => {
        reload();
    }, []);

    const isMobile = useMediaQuery('(max-width: 600px)');

    const handleOpenEditDialog = () => {
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => {
        reload();
        setOpenEditDialog(false);
    };

    return (
        <MDBContainer className="p-1 my-2">
            <Typography variant="h6" fontWeight="bold" className="my-3 pb-0" style={{ fontSize: '18px' }}>
                LeaderBoard
            </Typography>

            <div id="esconde">
                <Divider style={{ backgroundColor: 'black', marginBottom: '5vh', marginTop: '1.3vh' }} />
            </div>

            {data && (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>

                        {data.length === 0 && showSpinner && (
                            <div align="center">
                                <Spinner id="load" animation="border" variant="secondary" size="3rem" />
                                <p id="load2">Loading...</p>
                            </div>
                        )}

                        {data.length === 0 && !showSpinner && (
                            <div align="center">
                                <WarningIcon style={{ color: 'red', marginTop: '3vh' }} />
                                <p id="error2">There are no heats at the moment!</p>
                            </div>
                        )}

                        {data && data.length !== 0 && (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell id="esconde">Fed id</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell id="esconde">Gender</TableCell>
                                            <TableCell id="esconde">Category in competition</TableCell>
                                            <TableCell id="esconde">Global pontuation</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((heat) => (
                                            <TableRow
                                                style={{ cursor: 'pointer' }}
                                                key={heat.id}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <TableCell id="esconde">{heat.athlete.fed_id}</TableCell>
                                                <TableCell id="esconde">{heat.athlete.gender}</TableCell>
                                                <TableCell id="esconde">{heat.athlete.first_name}</TableCell>
                                                <TableCell id="esconde">{heat.athlete.last_name}</TableCell>
                                                <TableCell id="esconde">{heat.global_pontuation}</TableCell>

                                                <TableCell>
                                                    <Tooltip title="Edit" className="tooltip-gender">
                                                        <IconButton onClick={() => handleOpenEditDialog()}>
                                                            <EditIcon color="gray" style={{ cursor: 'pointer' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Grid>
                </Grid>
            )}
        </MDBContainer>
    );
};

export default Leaderboard;