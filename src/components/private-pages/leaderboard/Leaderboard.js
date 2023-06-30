import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { MDBContainer } from 'mdb-react-ui-kit';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Divider, TextField} from '@mui/material';
import axios from 'axios';
import { GetGenderFlags, handleMouseEnter, handleMouseLeave } from '../dashboard/utils/Utils';
import {getEndpointLeaderboard, putEndpointLeaderboard} from '../../../api/Urls';
import { Spinner } from 'react-bootstrap';
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import DialogContentText from "@mui/material/DialogContentText";
import DoneIcon from "@mui/icons-material/Done";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";


const Leaderboard = ({ idComp }) => {
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));
    const [data, setData] = useState(null);
    const [showSpinner, setShowSpinner] = useState(true);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [punctuation, setPunctuation] = useState('');
    const [idHeat, setIdHeat] = useState('');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);

    const handlePunctuationChange = (event) => {
        setPunctuation(event.target.value);
    };

    const fetchLeaderboard = async () => {
        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 3000); // Tempo limite de 3 segundos

        axios
            .get(getEndpointLeaderboard('leaderboard', idComp), {
                headers: { Authorization: `Token ${usuarioSalvo.token}` },
            })
            .then((response) => {
                /*console.log(response.data.results);*/
                setData(response.data.results);
            })
            .catch((error) => {
                console.error(error);
            });

        return () => clearTimeout(timer);
    };

    const reload = () => {
        fetchLeaderboard();

        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 3000); // Tempo limite de 3 segundos
        return () => clearTimeout(timer);
    };

    useEffect(() => {
        reload();
    }, []);

 /*   const isMobile = useMediaQuery('(max-width: 600px)');
*/
    const handleOpenEditDialog = (heatId) => {
        setIdHeat(heatId);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        reload();
        setOpenEditDialog(false);
    };

    const handleSubmit = async () => {

        const dataUp = {
            global_pontuation: punctuation
        };

        try {
            const response = await axios.put(putEndpointLeaderboard("leaderboard", idComp, idHeat), dataUp, {
                headers: {
                    Authorization: `Token ${usuarioSalvo.token}`,
                },
            });
            setSuccessDialogOpen(true);
            setTimeout(() => {
                setSuccessDialogOpen(false);
                handleCloseEditDialog();
            }, 3000);
        } catch (error) {
       /*     console.error(error.request.response);*/
            setErrorDialogOpen(true);
            setTimeout(() => {
                setErrorDialogOpen(false);
                handleCloseEditDialog();
            }, 3000);
        }
    };


    return (
        <MDBContainer className="p-1 my-2">

            <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
                <DialogContent>
                    <DialogContentText sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <DoneIcon sx={{color: 'green', fontSize: 48, marginBottom: '1%'}}/>
                        Heat successfully edited!
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
                <DialogContent>
                    <DialogContentText sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <ReportProblemIcon sx={{color: 'red', fontSize: 48, marginBottom: '1%'}}/>
                        Please contact the administrator. Error changing score.
                    </DialogContentText>
                </DialogContent>
            </Dialog>

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
                                            <TableCell>Pontuation</TableCell>
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
                                                <TableCell>
                                                    {window.innerWidth <= 768
                                                        ? heat.athlete.first_name.charAt(0).toUpperCase() + heat.athlete.first_name.slice(1).toLowerCase()
                                                        : `${heat.athlete.first_name.charAt(0).toUpperCase() + heat.athlete.first_name.slice(1).toLowerCase()} ${heat.athlete.last_name.charAt(0).toUpperCase() + heat.athlete.last_name.slice(1).toLowerCase()}`}
                                                </TableCell>
                                                <TableCell id="esconde">
                                                    {heat.athlete.gender === 'F' && (
                                                        <Tooltip title="Feminine" className="tooltip-gender">
                                                            {GetGenderFlags(heat.athlete.gender)}
                                                        </Tooltip>
                                                    )}
                                                    {heat.athlete.gender === 'M' && (
                                                        <Tooltip title="Masculine" className="tooltip-gender">
                                                            {GetGenderFlags(heat.athlete.gender)}
                                                        </Tooltip>
                                                    )}
                                                </TableCell>
                                                <TableCell id="esconde">
                                                    {heat.athlete.category_in_competition
                                                        ? heat.athlete.category_in_competition.charAt(0).toUpperCase() +
                                                        heat.athlete.category_in_competition.slice(1).toLowerCase().trim()
                                                        : 'Undefined'}
                                                </TableCell>
                                                <TableCell>{heat.global_pontuation}</TableCell>

                                                <TableCell>
                                                    <Tooltip title="Edit" className="tooltip-gender">
                                                        <IconButton  onClick={() => {
                                                            handleOpenEditDialog(heat.id);
                                                            setPunctuation(heat.global_pontuation)
                                                        }}>
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

            <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Punctuation Global</DialogTitle>
                <DialogContent >
                    <Grid item xs={6} sm={6}>
                        <TextField
                            select
                            label="Punctuation global"
                            value={punctuation}
                            onChange={handlePunctuationChange}
                            style={{ marginTop: '2vh' }}
                            fullWidth
                        >
                            {[...Array(11).keys()].map((num) => (
                                <MenuItem key={num} value={num}>
                                    {num}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </MDBContainer>
    );
};

export default Leaderboard;
