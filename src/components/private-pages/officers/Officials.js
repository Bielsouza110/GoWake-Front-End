import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from "../../../navs/Drawer";
import DrawerHeader from "../../../navs/DrawerHeader";
import {Container} from "@material-ui/core";
import {MDBContainer} from "mdb-react-ui-kit";
import {Spinner} from "react-bootstrap";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import {getCountryFlag, GetGenderFlags, handleMouseEnter, handleMouseLeave} from "../dashboard/utils/Utils";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {endpoints, getEndpointDeleteOfficialById} from "../../../api/Urls";
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
import EditAthlete from "../athetes/edit/EditAthlete";
import CreateOfficial from "./create/CreateOfficial";
import DoneIcon from '@mui/icons-material/Done';

const Officials = (props) => {

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [OfficialId, setOfficialId] = useState('');
    const [showSpinner, setShowSpinner] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [dataCompetition, setDataCompetition] = useState([]);
    const filteredData = data.filter(item => item.first_name.toLowerCase().includes(searchTerm.toLowerCase())
        || item.last_name.toLowerCase().includes(searchTerm.toLowerCase()));
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [successDialogOpenDelete, setSuccessDialogOpenDeleteDelete] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(endpoints.competitions, {
                headers: {
                    'Authorization': `Token ${usuarioSalvo.token}`
                }
            }).then(response => {
                const officialsData = response.data.results[0].officials;
                const sortedData = officialsData.sort((a, b) => a.first_name.localeCompare(b.first_name));
                setData(sortedData);
                setDataCompetition(response.data.results);
            }).catch(error => {
                console.error(error);
            });

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        fetchData();

        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 3000); // Tempo limite de 3 segundos

        return () => clearTimeout(timer);

    }, []);

    const reload = () => {

        fetchData();

        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 3000); // Tempo limite de 3 segundos

        return () => clearTimeout(timer);
    }
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleCloseSuccessDialogDelete = () => {
        setSuccessDialogOpenDeleteDelete(false);
    };
    const handleOfficialDelete = (officialId) => {

        const competitionIds = dataCompetition
            .filter(competition => competition.officials.some(official => official.id === officialId))
            .map(competition => competition.id);

        // console.log(competitionIds); // Output: [1, 3]

        competitionIds.forEach(competitionId => {
            axios.delete(getEndpointDeleteOfficialById("officialBy", competitionId, officialId), {
                headers: {
                    'Authorization': `Token ${usuarioSalvo.token}`
                }
            }).then(response => {

                if (response.status === 204) {
                    axios.get(endpoints.competitions, {
                        headers: {
                            'Authorization': `Token ${usuarioSalvo.token}`
                        }
                    }).then(response => {

                        reload();

                        setSuccessDialogOpenDeleteDelete(true);
                        setTimeout(() => {
                            setSuccessDialogOpenDeleteDelete(false);
                        }, 3000);

                    }).catch(error => {
                        console.error(error);
                    });
                } else {
                    console.error(`Failed to delete official ${officialId} from competition ${competitionId}.`);
                }
            }).catch(error => {
                console.error(error);
            });
        });
    };

    const handleClickOpenDelete = (id) => {
        setOfficialId(id);
        setOpen(true);
    };
    const handleDelete = (item) => {
        handleOfficialDelete(item)
        handleClose();
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
        reload();
    };
    const handleOpenEditDialog = (id) => {
        setOfficialId(id);
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        reload();
    };

    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <div className="sdd">
            <Box sx={{display: "flex"}}>
                <Drawer/>
                <Container id="marginDrawerHeader">
                    <DrawerHeader/>
                    <MDBContainer className="p-1 my-2">
                        <Typography variant="h6" fontWeight="bold" className="my-3 pb-0" style={{
                            fontSize: '20px'
                        }}>Officials</Typography>

                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Confirmation</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete this official?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancelar</Button>
                                <Button onClick={() => handleDelete(OfficialId)} color="error">
                                    Excluir
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog open={successDialogOpenDelete} onClose={handleCloseSuccessDialogDelete}>
                            <DialogContent>
                                <DialogContentText sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <DoneIcon sx={{ color: 'green', fontSize: 48, marginBottom: '1%' }} />
                                    Official deleted successfully!
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>

                        <Typography id="margin2">
                            Here you can see all the officials that are currently available. Click on the official to see
                            more details.
                        </Typography>

                        <TextField
                            label="Search by official name"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            size="large"
                            sx={{width: '100%', margin: '0 0 1rem'}}
                        />

                        {isMobile ? (
                            <Grid item xs={12} sm={12}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon/>}
                                    onClick={handleOpenDialog}
                                    style={{textTransform: 'none', color: 'success', marginBottom: '3vh'}}
                                    sx={{width: '100%', maxWidth: '100%'}}
                                >
                                    Create official
                                </Button>
                            </Grid>
                        ) : (
                            <Grid item xs={12} sm={12} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Button variant="contained" startIcon={<AddIcon/>} onClick={handleOpenDialog}
                                        style={{textTransform: 'none', color: 'success', marginBottom: '1vh'}}>
                                    Create official
                                </Button>
                            </Grid>
                        )}

                        <CreateOfficial
                            open={openDialog}
                            onClose={handleCloseDialog}
                        />

                        <EditAthlete
                            open={openEditDialog}
                            onClose={handleCloseEditDialog}
                            id={OfficialId}
                        />

                        {data.length === 0 && showSpinner &&
                            (
                                <div align="left">
                                    <Spinner id="load" animation="border" variant="secondary" size="3rem"/>
                                    <p id="load2">Loading...</p>
                                </div>
                            )
                        }

                        {data.length === 0 && !showSpinner && (
                            <div align="left">
                                <p id="error2">There are no officials at the moment!</p>
                            </div>
                        )}

                        {data.length !== 0 && (
                            <div>
                                <div>
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
                                                {filteredData.length > 0 && filteredData.map((item) => (
                                                    <TableRow style={{cursor: 'pointer'}} key={item.id}
                                                              onMouseEnter={handleMouseEnter}
                                                              onMouseLeave={handleMouseLeave}>
                                                        <TableCell id="esconde">{item.iwwfid}</TableCell>
                                                        <TableCell>{item.first_name.charAt(0).toUpperCase() + item.first_name.slice(1).toLowerCase()
                                                            + " " + item.last_name.charAt(0).toUpperCase() + item.last_name.slice(1).toLowerCase()}
                                                        </TableCell>

                                                        <TableCell id="esconde">
                                                            <Tooltip title={item.country.toUpperCase()}>
                                                                {getCountryFlag(item.country)}
                                                            </Tooltip>
                                                        </TableCell>

                                                        <TableCell id="esconde">{item.position.charAt(0).toUpperCase() + item.position.slice(1).toLowerCase()}</TableCell>

                                                        <TableCell>
                                                            <Tooltip title="Edit" className="tooltip-gender">
                                                                <IconButton
                                                                    onClick={() => handleOpenEditDialog(item.id)}>
                                                                    <EditIcon color="gray"
                                                                              style={{cursor: 'pointer'}}/>
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Remove" className="tooltip-gender">
                                                                <IconButton
                                                                    onClick={() => handleClickOpenDelete(item.id)}>
                                                                    <DeleteIcon color="error"
                                                                                style={{cursor: 'pointer'}}/>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}

                                                {filteredData.length === 0 &&
                                                    <TableRow onMouseEnter={handleMouseEnter}
                                                              onMouseLeave={handleMouseLeave}>
                                                        <TableCell colSpan={4} id="error2" align="left"> Official not found!</TableCell>
                                                    </TableRow>
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        )}
                    </MDBContainer>
                </Container>
            </Box>
        </div>
    );
};

export default Officials;
