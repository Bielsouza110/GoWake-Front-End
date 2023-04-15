import React, {useState} from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {FaDownload} from 'react-icons/fa';

import {Document, Page, pdfjs} from 'react-pdf';
import {saveAs} from 'file-saver';
import {Button} from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DownloadingTwoToneIcon from '@mui/icons-material/DownloadingTwoTone';
import AppBar from "../AppBar/AppBar";
import {Container} from "@material-ui/core";
import {MDBCol, MDBContainer, MDBInput, MDBRow} from "mdb-react-ui-kit";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const RulesLogin = () => {

    const DrawerHeader = styled('div')(({theme}) => ({
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
                const file = new Blob([blob], {type: 'application/pdf'});
                saveAs(file, 'Wakeboard rules.pdf');
            });
    };

    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({numPages}) {
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
                    <MDBContainer className="p-1 my-2">

                        <h5 className="fw-normal my-3 pb-2" style={{
                            letterSpacing: '1px', fontSize: '30px'
                        }}>General Rules</h5>

                        <Typography id="margin" variant="h6">
                            Applicability
                        </Typography>

                        <Typography id="margin">
                            The rules set out here govern wakeboard competitions sanctioned by the International Water Ski and
                            Wakeboard Federation. It is required that confederations use these rules and develop any additional
                            rules as close to these rules as possible.
                        </Typography>

                        <Typography id="margin">
                            The IWWF Wakeboard World Rules are supplementary to the general IWWF regulations, including
                            the Bye-Laws, Rules of Eligibility, Anti-Doping Policy, Letter of Agreement and Obligations for Titled
                            Events, and Guidelines. In case of conflict between a regulation in these rules and a general IWWF
                            regulation, the later shall apply.
                        </Typography>

                        <Typography id="margin" variant="h6">
                            Exceptions
                        </Typography>

                        <Typography id="margin">
                            Where compliance with the rules is not feasible, the Chief Judge shall, with the approval of
                            the majority of the Judges, make the necessary changes. Such changes will be announced at a
                            riders' or team captains' meeting, and by posting on the official notice board. The Chief Judge
                            shall send a report to the Chairman of the IWWF World Wakeboard Council (WWC) to explain these changes to
                            the rules. Where the rules are definite and feasible, a vote of the Judges to decide whether
                            to enforce any provision is prohibited.
                        </Typography>

                        <Typography id="margin" variant="h6">
                            Amendments
                        </Typography>

                        <Typography id="margin">
                            Riders are encouraged to make suggestions and raise questions about any concern to any judge
                            or
                            to the IWWF World Wakeboard Council. Contact information for officials and members of the
                            Council
                            is available on IWWF website. If preferred, any rider can raise any question with the Riders
                            ’
                            Representative who sits on the WWC, and who will convey those questions to the rest of the
                            Council
                            Members.
                        </Typography>

                        <Typography id="margin">
                            Suggestions regarding these rules must be brought up before November 1st for changes of the rules
                            for the following year.
                        </Typography>

                        <Typography id="margin" variant="h6">
                            Participation Contract
                        </Typography>

                        <Typography id="margin">
                            Prior to competing in any National or International event, all athletes must sign a participation
                            contract, or if the athlete is U18 years of age, his/her representative or team captain must sign on
                            their behalf.
                        </Typography>

                        <Typography id="margin">
                            All athletes must understand the nature of the sport and its special risks. It is the responsibility of the
                            athlete to register at the designated registration office and show proof of Federation membership and
                            insurance cover before riding. Athletes must disclose to the event organiser and Chief Judge any
                            special medical conditions, including but not limited to, injuries or other pre-existing medical
                            conditions and must sign a discharge of liability for the organizer and the host federation in case of
                            accident, material damages, or moral or physical tort, in the domain of the competition. All
                            organisations, Federations, persons or institutions involved in the organisation of an event who
                            encounter an illicit deed of a competitor, or an official, are obliged to use the local Constabulary in
                            order to judge all litigation and relevant charges against any person. A copy of the filed report shall
                            be forwarded to his/her own Federation who will prohibit any involvement/access to all events until
                            such times as the litigation is settled.
                        </Typography>

                        <Typography id="margin" variant="h6">
                            Anti-Doping
                        </Typography>

                        <Typography id="margin">
                            All competitors must agree to be subject to doping control. Specific policies and procedures regarding
                            doping control shall be under the control of the Medical Commission: All riders need to be aware of,
                            and agree to be bound by, the provisions of the IWWF Anti-Doping Rules, including but not limited
                            to, all amendments to the Anti-Doping Rules and all International Standards incorporated in the AntiDoping Rules.
                        </Typography>

                        <Typography id="margin" variant="h6">
                            Personal Data
                        </Typography>

                        <Typography id="margin">
                            All competitors must have comprehended and signed the Information Policy / Personal Data
                            Treatment before taking part at any IWWF event. This information complies with international laws
                            regarding individual data protection.
                        </Typography>

                        <Typography id="margin" variant="h6">
                            Alcohol
                        </Typography>

                        <Typography id="margin">
                            No alcohol is to be consumed by Athletes prior to or during the day’s event. The day’s event is
                            deemed as starting 1 hour prior to the first rider starting their run and finished when the final scores
                            for have been posted and the official protest time has elapsed. Once an athlete’s heat and results
                            are posted it is deemed that the athlete’s day is finished.
                        </Typography>

                        <Typography id="margin" variant="h6">
                            Unsportsmanlike Conduct
                        </Typography>

                        <Typography id="margin">
                            Any rider (or his/her representative) or official whose conduct is deemed unsportsmanlike or whose
                            conduct may cause discredit to the IWWF, IWWF World Wakeboard Council and sponsors, either on
                            or off the competition site, before during, or after the competition, may be disqualified from all or part
                            of the competition including completed events and/or be subject to a fine to be determined by the
                            IWWF Executive Board, by a two-thirds majority vote of the Judges. Any and all infractions can also
                            be punishable by disqualification of the whole team.
                        </Typography>

                        <Typography id="margin">
                            Unsportsmanlike conduct includes, but is not limited to:<br/>
                            - use of vulgar language in public,<br/>
                            - public tantrums<br/>
                            - not riding to fullest potential<br/>
                            - failure to attend designated functions or events<br/>
                            - failure to attend media conference, opening / closing ceremony, prize-presentation ceremony,
                            podium presentations<br/>
                            - consuming alcoholic beverages during or before the competition<br/>
                            - discrediting publicly event organizers, fellow athletes and/or host countries and/or host federations
                            verbally, and/or on social media<br/>
                            - use of prohibited substances<br/>
                            - competing under false pretences<br/>
                            - concealing significant injuries or health problems<br/>
                            - vandalizing or misrepresenting wakeboarding at official hotels venues or functions during the event<br/>
                        </Typography>

                        <Box style={buttonStyle} sx={{flexGrow: 0}}>
                            <Tooltip title="Download wakeboard rules" onClick={handleDownloadPDF}>
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