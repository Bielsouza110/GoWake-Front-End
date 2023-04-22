import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Box from "@mui/material/Box";
import Drawer from "../../../navs/Drawer";
import {Container} from "@material-ui/core";
import DrawerHeader from "../../../navs/DrawerHeader";
import {MDBContainer} from "mdb-react-ui-kit";
import Typography from "@mui/material/Typography";
import {getEndpointById} from "../../../api/Urls";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

function DetailCompetitions() {
    const [data, setData] = useState(null);
    const {id} = useParams();

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));
    const competitionsByIdApi = async () => {
        try {
            const response = await axios.get(getEndpointById("competitions", id), {
                headers: {
                    'Authorization': `Token ${usuarioSalvo.token}`
                }
            });
           // console.log(data.events[0].event_class);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        competitionsByIdApi();
    });

    return (
        <div className="sdd">
            <Box sx={{display: "flex"}}>
                <Drawer/>
                <Container id="marginDrawerHeader">
                    <DrawerHeader/>
                    <MDBContainer className="p-1 my-2">
                        <Typography paragraph className="my-3 pb-0">
                            Page Deail
                        </Typography>

                        {data ? (
                            <div>
                                <h1>{data.data}</h1>
                                <p>{data.code}</p>
                                <p>{data.name}</p>
                                <p>{data.organizing_country}</p>
                                <p>{data.site_code}</p>
                            </div>
                        ) : (
                            <p>Carregando...</p>
                        )}

                        {data && data.events.length !== 0 && data.events ? (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>event_class</TableCell>
                                            <TableCell>name</TableCell>
                                            <TableCell>code</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.events.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.event_class}</TableCell>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.code}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <p>Carregando...</p>
                        )}

                        <br/>


                        {/*Editar tudo isso ai embaixo*/}


                        <Grid container spacing={2}>

                            <Grid item xs={12} md={6}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Coluna 1</TableCell>
                                                <TableCell>Coluna 2</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Linha 1, coluna 1</TableCell>
                                                <TableCell>Linha 1, coluna 2</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Linha 2, coluna 1</TableCell>
                                                <TableCell>Linha 2, coluna 2</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>

                            {/* Tabela 2 */}
                            <Grid item xs={12} md={6}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Coluna 1</TableCell>
                                                <TableCell>Coluna 2</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Linha 1, coluna 1</TableCell>
                                                <TableCell>Linha 1, coluna 2</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Linha 2, coluna 1</TableCell>
                                                <TableCell>Linha 2, coluna 2</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>

                            {/* Tabela 3 */}
                            <Grid item xs={12} md={6}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Coluna 1</TableCell>
                                                <TableCell>Coluna 2</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Linha 1, coluna 1</TableCell>
                                                <TableCell>Linha 1, coluna 2</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Linha 2, coluna 1</TableCell>
                                                <TableCell>Linha 2, coluna 2</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>

                            {/* Tabela 3 */}
                            <Grid item xs={12} md={6}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Coluna 1</TableCell>
                                                <TableCell>Coluna 2</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Linha 1, coluna 1</TableCell>
                                                <TableCell>Linha 1, coluna 2</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Linha 2, coluna 1</TableCell>
                                                <TableCell>Linha 2, coluna 2</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>

                            </Grid>

                    </MDBContainer>
                </Container>
            </Box>
        </div>
    );
}

export default DetailCompetitions;
