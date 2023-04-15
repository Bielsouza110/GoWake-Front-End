import Drawer from "./Drawer";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Cards from "../home/Cards";
import DemoCarousel from "../home/DemoCarousel";
import { useLocation } from 'react-router-dom';
import {Container} from "@material-ui/core";
import {MDBContainer} from "mdb-react-ui-kit";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DownloadingTwoToneIcon from "@mui/icons-material/DownloadingTwoTone";
import React, {useEffect, useState} from "react";
import axios from "axios";

function Dashboard() {

    const location = useLocation();
    const objetoComState = location.state || null;
    const nome = objetoComState?.username || 'Nome não fornecido';
    const email = objetoComState?.email || 'Email não fornecido';
    const token = objetoComState?.token || 'Token não fornecido';

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const token2 = '818f3287afd55fdcbc86d21cc55e068b62cffa18';

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://mmonteiro.pythonanywhere.com/api/competitions/', {
                headers: {
                    'Authorization': `Token ${token2}`
                }
            });

            console.log(response.data.results);

            setData(response.data.results);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="sdd">
            <Box sx={{display: "flex"}}>
                <Drawer/>
                <Container>
                    <DrawerHeader/>
                    <MDBContainer className="p-1 my-2">

                        <h5 className="fw-normal my-3 pb-2" style={{
                            letterSpacing: '1px', fontSize: '30px'
                        }}>Dashboard</h5>

{/*                        <Typography id="margin" variant="h6">
                            Applicability
                        </Typography>*/}

{/*                        <div id="margin">
                            {data.map(item => (
                                <p key={item.id}>{item.name}</p>
                            ))}
                        </div>*/}

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Data</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map(item => (
                                    <tr key={item.id}>
                                        <td><a href={`/login/dashboard/${item.id}`}>{item.name}</a></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                    </MDBContainer>
                </Container>
            </Box>
        </div>
    );
}

export default Dashboard;
