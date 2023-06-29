import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from "../../../navs/Drawer";
import DrawerHeader from "../../../navs/DrawerHeader";
import {Container} from "@material-ui/core";
import {MDBContainer} from "mdb-react-ui-kit";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Divider} from "@mui/material";
import axios from "axios";
import {getEndpointCompetitionById, getEndpointLeaderboard} from "../../../api/Urls";

const Leaderboard = ({idComp}) => {

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));
    const [data, setData] = useState(null);
    const [showSpinner, setShowSpinner] = useState(true);

    const fetchLeaderboard = async () => {
        const timer = setTimeout(() => {setShowSpinner(false);}, 3000); // Tempo limite de 3 segundos

        axios.get(getEndpointLeaderboard("leaderboard", idComp), {
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

        fetchLeaderboard();

        const timer = setTimeout(() => {setShowSpinner(false);}, 3000); // Tempo limite de 3 segundos
        return () => clearTimeout(timer);
    }

    useEffect(() => {
        reload();
    }, []);

    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <MDBContainer className="p-1 my-2">
            <Typography variant="h6" fontWeight="bold" className="my-3 pb-0" style={{fontSize: '18px'}}>
                LeaderBoard
            </Typography>

            <div id="esconde"><Divider style={{ backgroundColor: 'black', marginBottom: '5vh', marginTop: '1.3vh' }} /></div>


        </MDBContainer>
    );
};

export default Leaderboard;