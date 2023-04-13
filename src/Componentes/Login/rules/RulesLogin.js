import React, {useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FaDownload } from 'react-icons/fa';

import { Document, Page, pdfjs } from 'react-pdf';
import { saveAs } from 'file-saver';
import {Button} from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DownloadingTwoToneIcon from '@mui/icons-material/DownloadingTwoTone';
import AppBar from "../AppBar/AppBar";
import {Container} from "@material-ui/core";
import {MDBCol, MDBContainer, MDBInput, MDBRow} from "mdb-react-ui-kit";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const RulesLogin = () => {

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const handleDownloadPDF = () => {
        fetch('/pdfs/rules.pdf') // Path to your PDF file in public folder
            .then(response => response.blob())
            .then(blob => {
                const file = new Blob([blob], { type: 'application/pdf' });
                saveAs(file, 'Wakeboard rules.pdf');
            });
    };

    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const buttonStyle = {

        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 100,
    };

    return (
        <div className="sdd">
            <Box sx={{display: "flex"}}>
                <AppBar/>
                <Container>
                    <DrawerHeader/>
                    <MDBContainer className="p-3 my-4">
                        <Typography paragraph>
                            Page Wakeboard Rules
                        </Typography>

                        <Box style={buttonStyle} sx={{flexGrow: 0}}>
                            <Tooltip title="Download wakeboard rules" onClick={handleDownloadPDF} >
                                <IconButton sx={{p: 1}}>
                                    <DownloadingTwoToneIcon fontSize="large"/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </MDBContainer>
                </Container>
            </Box>
        </div>
    );
};

export default RulesLogin;