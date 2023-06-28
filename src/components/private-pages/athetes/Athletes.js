import React, {useEffect, useState} from 'react';
import DrawerHeader from "../../../navs/DrawerHeader";
import {Container} from "@material-ui/core";
import {MDBContainer} from "mdb-react-ui-kit";
import {Spinner} from "react-bootstrap";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import {getCountryFlag, GetGenderFlags, handleMouseEnter, handleMouseLeave} from "../dashboard/utils/Utils";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {
    endpoints,
    getEndpointAthleteById,
    getEndpointCompetitionById, getEndpointCreateAthlete,
    getEndpointDeleteAthleteById, postEndpointGenerateHeats
} from "../../../api/Urls";
import {Edit as EditIcon, Delete as DeleteIcon} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/material/Tooltip";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import EditAthlete from "./edit/EditAthlete";
import CreateAthlete from "./create/CreateAthlete";
import DoneIcon from "@mui/icons-material/Done";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import Typography from "@mui/material/Typography";
import {Divider} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CachedIcon from '@mui/icons-material/Cached';

const Athletes = ({idComp}) => {

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [idAthlete, setIdAthlete] = useState('');
    const [showSpinner, setShowSpinner] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [successDialogOpenDelete, setSuccessDialogOpenDelete] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [data, setData] = useState(null)

    const [errorHeatDialogOpen, setErrorHeatDialogOpen] = useState(false);
    const [successHeatDialogOpen, setSuccessHeatDialogOpen] = useState(false);

    const fetchAtletes = async () => {
        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 3000); // Tempo limite de 3 segundos

        axios.get(getEndpointCompetitionById("competitionsBy", idComp), {
            headers: {'Authorization': `Token ${usuarioSalvo.token}`}
        }).then(response => {
            setData(response.data);
        }).catch(error => {
            console.error(error);
        });

        return () => clearTimeout(timer);
    };
    const reload = () => {
        fetchAtletes();

        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 3000); // Tempo limite de 3 segundos
        return () => clearTimeout(timer);
    }

    useEffect(() => {
        reload();
    }, []);
    const handleCloseSuccessDialogDelete = () => {
        setSuccessDialogOpenDelete(false);
    };
    const handleAthleteDelete = async (idComp, idAthl) => {

        try {
            const response = await axios.delete(getEndpointDeleteAthleteById("athleteBy", idComp, idAthl), {
                headers: {
                    'Authorization': `Token ${usuarioSalvo.token}`
                }
            });

            reload();
            setSuccessDialogOpenDelete(true);
            setTimeout(() => {
                setSuccessDialogOpenDelete(false);
            }, 3000);

        } catch (error) {
            console.error('An error occurred while fetching the athlete.');
            setErrorDialogOpen(true);
            setTimeout(() => {
                setErrorDialogOpen(false);
            }, 3000);
        }
    };
    const handleClickOpenDelete = (compId, athlId) => {
        setIdAthlete(athlId);
        setOpen(true);
    };
    const handleDelete = (idComp, idAthl) => {
        handleAthleteDelete(idComp, idAthl)
        handleClose();
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        fetchAtletes();
        setOpenDialog(false);
    };
    const handleOpenEditDialog = (competitionId, athleteId) => {
        setIdAthlete(athleteId);
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => {
        reload();
        setOpenEditDialog(false);
    };

    const isMobile = useMediaQuery('(max-width: 600px)');

    const generateHeat = async () => {

        const dataApi = {
            competition_id: idComp,
        };

        try {
            const response = await axios.post(postEndpointGenerateHeats("heatSystem"), dataApi, {
                headers: {
                    Authorization: `Token ${usuarioSalvo.token}`,
                },
            });
            console.log("função generate sucess");

            setSuccessHeatDialogOpen(true);
            setTimeout(() => {
                setSuccessHeatDialogOpen(false);
            }, 3000);

        } catch (error) {
            console.error(error.request.response);

            setErrorHeatDialogOpen(true);
            setTimeout(() => {
                setErrorHeatDialogOpen(false);
            }, 3000);
        }
    };

    return (
        <MDBContainer className="p-1 my-2">
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this athlete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleDelete(idComp, idAthlete)} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={successDialogOpenDelete} onClose={handleCloseSuccessDialogDelete}>
                <DialogContent>
                    <DialogContentText
                        sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <DoneIcon sx={{color: 'green', fontSize: 48, marginBottom: '1%'}}/>
                        Athlete deleted successfully!
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
                <DialogContent>
                    <DialogContentText
                        sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <ReportProblemIcon sx={{color: 'red', fontSize: 48, marginBottom: '1%'}}/>
                        Please contact the administrator. You do not have permission.
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <Dialog open={successHeatDialogOpen} onClose={() => setSuccessHeatDialogOpen(false)}>
                <DialogContent>
                    <DialogContentText
                        sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <DoneIcon sx={{color: 'green', fontSize: 48, marginBottom: '1%'}}/>
                        Heat created successfully!
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <Dialog open={errorHeatDialogOpen} onClose={() => setErrorHeatDialogOpen(false)}>
                <DialogContent>
                    <DialogContentText
                        sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <ReportProblemIcon sx={{color: 'red', fontSize: 48, marginBottom: '1%'}}/>
                        Error. Please contact the administrator.
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <CreateAthlete
                open={openDialog}
                onClose={handleCloseDialog}
                idComp={idComp}
            />

            <EditAthlete
                open={openEditDialog}
                onClose={handleCloseEditDialog}
                idAth={idAthlete}
                idComp={idComp}
            />

            <Grid item xs={12} sm={12} container alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold" className="my-3 pb-0" style={{fontSize: '18px'}}>
                    Athletes
                </Typography>

                {isMobile ? (
                    <div>
                        <Grid item xs={12} sm={12}>
                            <Button
                                variant="contained"
                                startIcon={<CachedIcon/>}
                                onClick={generateHeat}
                                style={{
                                    textTransform: 'none',
                                    backgroundColor: 'green',
                                    marginBottom: '1.5vh',
                                }}
                                sx={{width: '100%', maxWidth: '100%'}}
                            >
                                <span style={{ color: 'inherit' }}>Generate heat</span>
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon/>}
                                onClick={handleOpenDialog}
                                style={{
                                    textTransform: 'none',
                                    color: 'success',
                                    marginBottom: '2vh',
                                }}
                                sx={{width: '100%', maxWidth: '100%'}}
                            >
                                <span style={{ color: 'inherit' }}>Create athlete</span>
                            </Button>
                        </Grid>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center' }}>

                        <Button
                            variant="contained"
                            startIcon={<CachedIcon />}
                            onClick={generateHeat}
                            style={{
                                textTransform: 'none',
                                backgroundColor: 'green',
                                marginBottom: '1vh',
                            }}
                        >
                            <span style={{ color: 'inherit' }}>Generate heat</span>
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon/>}
                            onClick={handleOpenDialog}
                            style={{
                                textTransform: 'none',
                                color: 'success',
                                marginBottom: '1vh',
                                marginLeft: '2vh',
                            }}
                        >
                            <span style={{ color: 'inherit' }}>Create athlete</span>
                        </Button>
                    </div>
                )}
            </Grid>

            <div id="esconde"><Divider style={{backgroundColor: 'black', marginBottom: '5vh', marginTop: '1.3vh'}}/>
            </div>

            {data && (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>

                        {data.athletes.length === 0 && showSpinner && (
                            <div align="center">
                                <Spinner id="load" animation="border" variant="secondary" size="3rem"/>
                                <p id="load2">Loading...</p>
                            </div>
                        )}

                        {data.athletes.length === 0 && !showSpinner && (
                            <div align="center">
                                <WarningIcon style={{color: 'red', marginTop: '3vh'}}/>
                                <p id="error2"> There are no athletes at the moment!</p>
                            </div>
                        )}

                        {data.athletes.length !== 0 && (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell id="esconde">Fed id</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell id="esconde">Country</TableCell>
                                            <TableCell id="esconde">Gender</TableCell>
                                            <TableCell id="esconde">Category in competition</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.athletes.map((athlete) => (
                                            <TableRow style={{cursor: 'pointer'}} key={athlete.id}
                                                      onMouseEnter={handleMouseEnter}
                                                      onMouseLeave={handleMouseLeave}>
                                                <TableCell id="esconde">{athlete.fed_id}</TableCell>
                                                <TableCell>
                                                    {window.innerWidth <= 768 ?
                                                        athlete.first_name.charAt(0).toUpperCase() + athlete.first_name.slice(1).toLowerCase() :
                                                        `${athlete.first_name.charAt(0).toUpperCase() + athlete.first_name.slice(1).toLowerCase()} ${athlete.last_name.charAt(0).toUpperCase() + athlete.last_name.slice(1).toLowerCase()}`}
                                                </TableCell>
                                                <TableCell id="esconde">
                                                    <Tooltip title={athlete.country.toUpperCase()}>
                                                        {getCountryFlag(athlete.country)}
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell id="esconde">
                                                    {athlete.gender === "F" && (
                                                        <Tooltip title="Feminine"
                                                                 className="tooltip-gender">
                                                            {GetGenderFlags(athlete.gender)}
                                                        </Tooltip>
                                                    )}
                                                    {athlete.gender === "M" && (
                                                        <Tooltip title="Masculine"
                                                                 className="tooltip-gender">
                                                            {GetGenderFlags(athlete.gender)}
                                                        </Tooltip>
                                                    )}
                                                </TableCell>
                                                <TableCell id="esconde">
                                                    {athlete.category_in_competition ? athlete.category_in_competition.charAt(0).toUpperCase() + athlete.category_in_competition.slice(1).toLowerCase().trim() : 'Undefined'}
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Edit" className="tooltip-gender">
                                                        <IconButton
                                                            onClick={() => handleOpenEditDialog(idComp, athlete.id)}>
                                                            <EditIcon color="gray" style={{cursor: 'pointer'}}/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Remove" className="tooltip-gender">
                                                        <IconButton
                                                            onClick={() => handleClickOpenDelete(idComp, athlete.id)}>
                                                            <DeleteIcon color="error" style={{cursor: 'pointer'}}/>
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

export default Athletes;