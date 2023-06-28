import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from "../../../navs/Drawer";
import DrawerHeader from "../../../navs/DrawerHeader";
import { Container, Grid } from "@material-ui/core";
import { MDBContainer } from "mdb-react-ui-kit";
import './UploadXML.css';
import DropFileInput from "./drop-file-input/DropFileInput";

const UploadXML = () => {
    const [marginTop, setMarginTop] = useState(0);

    const handleResize = () => {
        const isMobile = window.matchMedia('(max-width: 600px)').matches;
        const newMarginTop = isMobile ? '-3vh' : '-0.5vh';
        setMarginTop(newMarginTop)
    };

    useEffect(() => {

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const onFileChange = (files) => {
        //console.log(files);
    };

    return (
        <div className="sdd">
            <Box sx={{ display: "flex" }}>
                <Drawer />
                <Container id="marginDrawerHeader">
                    <DrawerHeader />
                    <Grid container style={{ marginTop }}>
                        <Grid item xs={12}>
                            <MDBContainer className="p-1 my-2" >
                                <Typography variant="h6" fontWeight="bold" className="my-3 pb-0" style={{ fontSize: '20px' }}>Input XML file</Typography>
                                <DropFileInput onFileChange={onFileChange} />
                            </MDBContainer>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default UploadXML;
