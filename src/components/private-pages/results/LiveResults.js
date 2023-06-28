import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from "../../../navs/Drawer";
import DrawerHeader from "../../../navs/DrawerHeader";
import {Container} from "@material-ui/core";
import {MDBContainer} from "mdb-react-ui-kit";
import useMediaQuery from "@mui/material/useMediaQuery";

const LiveResults = () => {

    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <div className="sdd" style={{marginTop: isMobile ? "1%" : "1.2%"}}>
            <Box sx={{display: "flex"}}>
                <Drawer/>
                <Container id="marginDrawerHeader">
                    <DrawerHeader/>
                    <MDBContainer className="p-1 my-2">
                        <Typography paragraph className="my-3 pb-0">
                            Page Live Results
                        </Typography>
                    </MDBContainer>
                </Container>
            </Box>
        </div>
    );
};

export default LiveResults;