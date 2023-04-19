import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Box from "@mui/material/Box";
import Drawer from "../../../navs/Drawer";
import {Container} from "@material-ui/core";
import DrawerHeader from "../../../navs/DrawerHeader";
import {MDBContainer} from "mdb-react-ui-kit";
import Typography from "@mui/material/Typography";

function DetailCompetitions() {
    const [data, setData] = useState(null);
    const {id} = useParams();

    const token2 = '818f3287afd55fdcbc86d21cc55e068b62cffa18';
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://mmonteiro.pythonanywhere.com/api/competitions/${id}/`, {
                headers: {
                    'Authorization': `Token ${token2}`
                }
            });

            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    });

    return (
        <div className="sdd">
            <Box sx={{display: "flex"}}>
                <Drawer/>
                <Container id="marginDrawerHeader">
                    <DrawerHeader/>
                    <MDBContainer className="p-1 my-2">
                        <Typography paragraph className="my-3 pb-0">
                            Page Create Event
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
                    </MDBContainer>
                </Container>
            </Box>
        </div>
    );
}

export default DetailCompetitions;
