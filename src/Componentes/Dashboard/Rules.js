import React, {useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from "./Drawer";
import { FaDownload } from 'react-icons/fa';

import { Document, Page, pdfjs } from 'react-pdf';
import { saveAs } from 'file-saver';
import {Button} from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DownloadingTwoToneIcon from '@mui/icons-material/DownloadingTwoTone';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Rules = () => {

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
        <Box sx ={{display:"flex"}}>
            <Drawer/>
            <Box component="main" sx={{ flexGrow: 1, p: 3, margin:0 }}>
                <DrawerHeader />
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

{/*                <div>
                    <Document
                        file="/pdfs/rules.pdf"
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        {Array.from(
                            new Array(numPages),
                            (el, index) => (
                                <div key={`page_${index + 1}`}>
                                    <Page pageNumber={index + 1} />
                                </div>
                            ),
                        )}
                    </Document>
                </div>*/}

            </Box>
        </Box>
        </div>
    );
};

export default Rules;