import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from "../../../navs/Drawer";
import DrawerHeader from "../../../navs/DrawerHeader";
import {Container} from "@material-ui/core";
import {MDBContainer} from "mdb-react-ui-kit";
import {Spinner} from "react-bootstrap";
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
    TextField
} from "@mui/material";
import {getCountryFlag, GetGenderFlags, handleMouseEnter, handleMouseLeave} from "../dashboard/utils/Utils";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {
    endpoints,
    getEndpointCompetitionById,
    getEndpointDeleteAthleteById,
    getEndpointDeleteOfficialById
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
import CreateOfficial from "./create/CreateOfficial";
import DoneIcon from '@mui/icons-material/Done';
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import EditOffcial from "./edit/EditOfficial"
import WarningIcon from "@mui/icons-material/Warning";

const Officials = ({idComp}) => {

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [idOfficial, setIdOfficial] = useState('');
    const [showSpinner, setShowSpinner] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [successDialogOpenDelete, setSuccessDialogOpenDeleteDelete] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [data, setData] = useState(null);

    const fetchOfficials = async () => {
        const timer = setTimeout(() => {setShowSpinner(false);}, 3000); // Tempo limite de 3 segundos

        axios.get(getEndpointCompetitionById("competitionsBy", idComp), {
            headers: {'Authorization': `Token ${usuarioSalvo.token}`}
        }).then(response => {
            console.log(response.data);
            setData(response.data);
        }).catch(error => {
            console.error(error);
        });

        return () => clearTimeout(timer);
    };
    const reload = () => {

        fetchOfficials();

        const timer = setTimeout(() => {setShowSpinner(false);}, 3000); // Tempo limite de 3 segundos
        return () => clearTimeout(timer);
    }

    useEffect(() => {
        reload();
    }, []);

    const handleCloseSuccessDialogDelete = () => {
        setSuccessDialogOpenDeleteDelete(false);
    };
    const handleOfficialDelete = async (idOffic) => {
        try {
            const response = await axios.delete(getEndpointDeleteOfficialById("officialBy", idComp, idOffic), {
                headers: {
                    'Authorization': `Token ${usuarioSalvo.token}`
                }
            });

            reload();
            setSuccessDialogOpenDeleteDelete(true);
            setTimeout(() => {setSuccessDialogOpenDeleteDelete(false);}, 3000);

        } catch (error) {
            console.error('An error occurred while fetching the official.');
            setErrorDialogOpen(true);
            setTimeout(() => {
                setErrorDialogOpen(false);
            }, 3000);
        }
    };
    const handleClickOpenDelete = (officId) => {
        setIdOfficial(officId);
        setOpen(true);
    };
    const handleDelete = (idOffic) => {
        handleOfficialDelete(idOffic)
        handleClose();
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        fetchOfficials();
        setOpenDialog(false);
    };
    const handleOpenEditDialog = (officId) => {
        setIdOfficial(officId);
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => {
        reload();
        setOpenEditDialog(false);
    };

    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <MDBContainer className="p-1 my-2">
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this official?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleDelete(idOfficial)} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={successDialogOpenDelete} onClose={handleCloseSuccessDialogDelete}>
                <DialogContent>
                    <DialogContentText
                        sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <DoneIcon sx={{color: 'green', fontSize: 48, marginBottom: '1%'}}/>
                        Official deleted successfully!
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

            <CreateOfficial
                open={openDialog}
                onClose={handleCloseDialog}
                idComp={idComp}
            />

            <EditOffcial
                open={openEditDialog}
                onClose={handleCloseEditDialog}
                idOffic={idOfficial}
                idComp={idComp}
            />

            {isMobile ? (
                <div>
                    <Typography variant="h6" fontWeight="bold" className="my-3 pb-0" style={{fontSize: '18px'}}>
                        Officials
                    </Typography>

                    <Grid item xs={12} sm={12}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon/>}
                            onClick={handleOpenDialog}
                            style={{textTransform: 'none', color: 'success', marginBottom: '3vh'}}
                            sx={{width: '100%', maxWidth: '100%'}}
                        >
                            <span style={{ color: 'inherit' }}>Create official</span>
                        </Button>
                    </Grid>
                </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold" className="my-3 pb-0" style={{fontSize: '18px'}}>
                        Officials
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenDialog}
                        style={{ textTransform: 'none', color: 'success', marginLeft: 'auto' }}
                    >
                        <span style={{ color: 'inherit' }}>Create official</span>
                    </Button>
                </div>
            )}

            <div id="esconde"><Divider style={{ backgroundColor: 'black', marginBottom: '5vh', marginTop: '1.3vh' }} /></div>

            {data && (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>

                        {data.officials.length === 0 && showSpinner &&  (
                            <div align="center">
                                <Spinner id="load" animation="border" variant="secondary" size="3rem" />
                                <p id="load2">Loading...</p>
                            </div>
                        )}

                        {data.officials.length === 0 && !showSpinner && (
                            <div align="center">
                                <WarningIcon style={{ color: 'red', marginTop: '3vh' }} />
                                <p id="error2">There are no officials at the moment!</p>
                            </div>
                        )}


                        {data.officials.length !== 0 && (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell id="esconde">Iwwf id</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell id="esconde">Country</TableCell>
                                            <TableCell id="esconde">Position</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.officials.map((official) => (
                                            <TableRow style={{cursor: 'pointer'}} key={official.id}
                                                      onMouseEnter={handleMouseEnter}
                                                      onMouseLeave={handleMouseLeave}>
                                                <TableCell id="esconde">{official.iwwfid}</TableCell>
                                                <TableCell>
                                                    {window.innerWidth <= 768 ?
                                                        official.first_name.charAt(0).toUpperCase() + official.first_name.slice(1).toLowerCase() :
                                                        `${official.first_name.charAt(0).toUpperCase() + official.first_name.slice(1).toLowerCase()} ${official.last_name.charAt(0).toUpperCase() + official.last_name.slice(1).toLowerCase()}`}
                                                </TableCell>
                                                <TableCell id="esconde">
                                                    <Tooltip title={official.country.toUpperCase()}>
                                                        {getCountryFlag(official.country)}
                                                    </Tooltip>
                                                </TableCell>

                                                <TableCell
                                                    id="esconde">{official.position.charAt(0).toUpperCase() + official.position.slice(1).toLowerCase()}</TableCell>
                                                <TableCell>
                                                    <Tooltip title="Edit" className="tooltip-gender">
                                                        <IconButton
                                                            onClick={() => handleOpenEditDialog(official.id)}>
                                                            <EditIcon color="gray"
                                                                      style={{cursor: 'pointer'}}/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Remove" className="tooltip-gender">
                                                        <IconButton
                                                            onClick={() => handleClickOpenDelete(official.id)}>
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

export default Officials;