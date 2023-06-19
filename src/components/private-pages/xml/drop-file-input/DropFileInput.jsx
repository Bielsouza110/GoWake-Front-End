import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import './DropFileInput.css';
import {ImageConfig} from "../config/ImageConfig";
import uploadImg from '../../../../assets/cloud-upload-regular-240.png'
import {Card, CardContent, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {getCountryFlag, GetGenderFlags, handleMouseEnter, handleMouseLeave} from "../../dashboard/utils/Utils";
import Tooltip from "@mui/material/Tooltip";
import {Delete as DeleteIcon, Edit as EditIcon} from "@mui/icons-material";
import {Visibility} from "@material-ui/icons";
import PublishIcon from '@mui/icons-material/Publish';


let juriList = [];//Array global dos jurados
let eventList = [];//Lista global dos eventos --> só pode ter 1 competição por XML, apesar de ser só 1 tive que fazer num array
let athletesList = []; //Lista global dos atletas
let competitionList = [];
let index = 0

const DropFileInput = (props) => {
    const clear = () => {
        juriList = [];
        eventList = [];
        athletesList = [];
        competitionList = [];
        index = 0;
    }

    const [fileList, setFileList] = useState([]);
    const wrapperRef = useRef(null);
    const [openDialogIndex, setOpenDialogIndex] = useState(null);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.add('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    };

    const fileRemove = (file,index) => {
        if (file != null ){
            const updatedList = [...fileList];
            updatedList.splice(fileList.indexOf(file), 1);
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }else{
            const updatedList = [...fileList];
            updatedList.splice(index, 1);
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }

    };

    /*const fileRemove2 = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    };*/

    const handleOpenDialog = (index) => {
        setOpenDialogIndex(index);
    };

    const handleCloseDialog = () => {
        setOpenDialogIndex(null);
    };


    const handleFileSubmit = (file) => {
        clear();

        index = fileList.indexOf(file);
        let count = 0;

        if (fileList[index]) {
            const reader = new FileReader();
            reader.onload = () => {
                const fileUrl = reader.result;
                /*console.log(fileUrl);*/

                fetch(fileUrl).then(response => {

                    return response.text();
                }).then(xmlString => {
                    const xmlDocument = new DOMParser().parseFromString(xmlString, "text/xml");
                    //const competitions = xmlDocument.querySelectorAll("");//ver mais tarde sobre o inicio do XML
                    const events = xmlDocument.querySelectorAll("events");
                    const officials = xmlDocument.querySelectorAll("officials");
                    const athletes = xmlDocument.querySelectorAll("athletes");


                    const discipline = xmlDocument.querySelector("discipline, Discipline").textContent;
                    const code = xmlDocument.querySelector("code,Code").textContent;
                    const name = xmlDocument.querySelector("name,Name").textContent;
                    const orgCountry = xmlDocument.querySelector("organizing_country,OrganizingCountry").textContent;
                    const tournament_type = xmlDocument.querySelector("tournament_type,TournamentType").textContent;
                    const venue = xmlDocument.querySelector("venue,Venue").textContent;
                    const site_code = xmlDocument.querySelector("site_code,SiteCode").textContent;
                    const startDate = xmlDocument.querySelector("beginning_date,BeginningDate").textContent;
                    const endDate = xmlDocument.querySelector("end_date,EndDate").textContent;
                    const age_groups = xmlDocument.querySelector("age_groups,AgeGroup").textContent;

                    competitionList.push({
                        discipline: discipline,
                        code: code,
                        name: name,
                        orgCountry: orgCountry,
                        tournament_type: tournament_type,
                        venue: venue,
                        site_code: site_code,
                        startDate: startDate,
                        endDate: endDate,
                        age_groups: age_groups
                    })

                    for (const event of events) {

                        if (count === 0) {
                            const code_Event = event.querySelector("code,Code").textContent;
                            const rounds = event.querySelector("rounds,Rounds").textContent;
                            const classEvent = event.querySelector("event_class,Event_Class").textContent;
                            const name = event.querySelector("name,Name").textContent;

                            eventList.push({
                                code: code_Event,
                                rounds: rounds,
                                classEvent: classEvent,
                                name: name
                            });
                            count++;
                        } else {
                            break;
                        }
                    }

                    for (const official of officials) {
                        const iwwfID = official.querySelector("iwwfid,Iwwfid").textContent;
                        const position = official.querySelector("position,Position").textContent;
                        const lastName = official.querySelector("last_name,LastName").textContent;
                        const firstName = official.querySelector("first_name,FirstName").textContent;
                        const qualification = official.querySelector("qualification,Qualification");
                        const qualificationValue = qualification ? qualification.textContent : '';
                        const country = official.querySelector("country,Country").textContent;
                        const region = official.querySelector("region,Region").textContent;

                        juriList.push({
                            id: iwwfID,
                            category: position,
                            lastName: lastName,
                            firstName: firstName,
                            qualification: qualificationValue,
                            country: country,
                            region: region
                        });
                    }

                    for (const athlete of athletes) {
                        const fed_id = athlete.querySelector("fed_id,FedId").textContent;
                        const lastName = athlete.querySelector("last_name,LastName").textContent;
                        const firstName = athlete.querySelector("first_name,FirstName").textContent;
                        const country = athlete.querySelector("country,Country").textContent;
                        const gender = athlete.querySelector("gender,Gender").textContent;
                        const birthYear = athlete.querySelector("year_of_birth,YearOfBirth").textContent;
                        const code = athlete.querySelector("code,Code").textContent;
                        const division = athlete.querySelector("division,Division").textContent;
                        const entry_type = athlete.querySelector("entry_type,EntryType").textContent;
                        const participation = athlete.querySelector("participation,Participation").textContent;
                        const category = athlete.querySelector("real_category,RealCategory").textContent;
                        const competitionCategory = athlete.querySelector("category_in_competition,CategoryInCompetition").textContent;

                        athletesList.push({
                            id: fed_id,
                            lastName: lastName,
                            firstName: firstName,
                            country: country,
                            gender: gender,
                            year: birthYear,
                            code: code,
                            division: division,
                            entry_type: entry_type,
                            participation: participation,
                            category: category,
                            competitionCategory: competitionCategory
                        })
                    }
                    handleOpenDialog(1);
                });

            };
            reader.readAsDataURL(fileList[index]);
        }

    };


    const displayCompetition = () => {
        if (openDialogIndex !== null) {
            return (
                <div className="competition-container">
                    <h6>Competition name: <span className="value">{competitionList[0].name}</span></h6>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>

                                    <TableCell className="competition-table" id="esconde">Code</TableCell>
                                    <TableCell className="competition-table">Discipline</TableCell>
                                    <TableCell className="competition-table" id="esconde">Country</TableCell>
                                    <TableCell className="competition-table" id="esconde">Type</TableCell>
                                    <TableCell className="competition-table">Venue</TableCell>
                                    <TableCell className="competition-table">Site code</TableCell>
                                    <TableCell className="competition-table">Group Age</TableCell>
                                    <TableCell className="competition-table">Start date</TableCell>
                                    <TableCell className="competition-table">End date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>

                                    <TableCell id="esconde">{competitionList[0].code}</TableCell>
                                    <TableCell>{competitionList[0].discipline}</TableCell>
                                    <TableCell id="esconde">{competitionList[0].orgCountry}</TableCell>
                                    <TableCell id="esconde">{competitionList[0].tournament_type}</TableCell>
                                    <TableCell>{competitionList[0].site_code}</TableCell>
                                    <TableCell>{competitionList[0].venue}</TableCell>
                                    <TableCell>{competitionList[0].age_groups}</TableCell>
                                    <TableCell>{competitionList[0].startDate}</TableCell>
                                    <TableCell>{competitionList[0].endDate}</TableCell>

                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            )
        }
    }


    const displayJuri = () => {
        if (openDialogIndex !== null) {
            return (
                <div className="juri-container">
                    <h5>Juri painel</h5>
                    <div className="juri-blank-container">
                        {juriList.map((item, index) => (
                            <Card className="juri-item" key={index}>
                                <CardContent>
                                    <Typography variant="body1" component="div">
                                        <strong>ID:</strong> {item.id}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        <strong>Position:</strong> {item.category}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        <strong>First Name:</strong> {item.firstName}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        <strong>Last Name:</strong> {item.lastName}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        <strong>Qualification:</strong> {item.qualification}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        <strong>Country:</strong> {item.country}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        <strong>Region:</strong> {item.region}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            );
        }

        return null; // Retorna null se openDialogIndex for null
    };

    const displayAthletes = () => {
        if (openDialogIndex !== null) {
            return (
                <div>
                    <h5>Athletes painel</h5>
                    <div className="athletes-blank-container">
                        {athletesList.map((item, index) => (
                            <Card className="athletes-item" key={index}>
                                <CardContent>
                                    <Typography variant="body1" component="div">
                                        <strong>ID:</strong> {item.id}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        <strong>First name:</strong> {item.firstName}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        <strong>Last Name:</strong> {item.lastName}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        <strong>Country:</strong> {item.country}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        <strong>Gender:</strong> {item.gender}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        <strong>Birth year:</strong> {item.year}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        <strong>Real category:</strong> {item.category}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        <strong>Competition category:</strong> {item.competitionCategory}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )
        }
        return null;
    }

    const displayEvent = () => {
        if (openDialogIndex !== null) {
            return (
                <div className="event-container">
                    <h6>Event description </h6>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>

                                    <TableCell className="event-table">Event</TableCell>
                                    <TableCell className="event-table">Code</TableCell>
                                    <TableCell className="event-table">Class event</TableCell>
                                    <TableCell className="event-table">Rounds</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>

                                    <TableCell>{eventList[0].name}</TableCell>
                                    <TableCell>{eventList[0].code}</TableCell>
                                    <TableCell>{eventList[0].classEvent}</TableCell>
                                    <TableCell>{eventList[0].rounds}</TableCell>

                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>


                    {/*<div className="event">
                        <p>Event: <span className="value">{eventList[0].name}</span></p>
                        <p>Code: <span className="value">{eventList[0].code}</span></p>
                        <p>Class event: <span className="value">{eventList[0].classEvent}</span></p>
                        <p>Rounds: <span className="value">{eventList[0].rounds}</span></p>
                    </div>*/}
                </div>

            )
        }
    }


    const renderDialog = () => {

        if (openDialogIndex !== null) {
            return (
                <Dialog open={true} onClose={handleCloseDialog} maxWidth="lg">
                    {/*maxWidth="md" fullWidth = "800"*/}
                    {/*sx={{width: '100%', maxWidth: '100%'}}*/}

                    <DialogTitle>XML Preview</DialogTitle>
                    <DialogContent>

                        {displayCompetition()}
                        {displayEvent()}
                        {displayJuri()}
                        {displayAthletes()}

                        <DialogContentText>
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions>

                        <DialogActions>
                            <Button onClick={() => {
                                fileRemove(null,index);
                                handleCloseDialog() }}>Submit</Button>
                        </DialogActions>
                        <Button onClick={handleCloseDialog}>Close</Button>
                    </DialogActions>

                </Dialog>
            );
        }
        return null;
    };

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input_label">
                    <img src={uploadImg} alt=""/>
                    <p>Drag & Drop your files here!</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {fileList.length > 0 ? (
                <div className="drop-file-preview">
                    <p className="drop-file-preview_title">Ready to upload</p>
                    {fileList.map((item, index) => (
                        <div key={index} className="drop-file-preview_item">
                            <img src={ImageConfig[item.type.split('/')[1] || ImageConfig['default']]} alt=""/>
                            <div className="drop-file-preview_item_info">
                                <p>{item.name}</p>
                            </div>

                            <Tooltip title="Submit" className="tooltip-gender">
                                <IconButton id="drop-file-item_submit"
                                            onClick={() => handleFileSubmit(item)}>
                                    <PublishIcon style={{ color: 'forestgreen', cursor: 'pointer' }} />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Preview" className="tooltip-gender">
                                <IconButton id="drop-file-item_preview"
                                            onClick={() => handleFileSubmit(item)}>
                                    <Visibility style={{ color: '#4267b2', cursor: 'pointer' }} />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Remove" className="tooltip-gender">
                                <IconButton id="drop-file-item_del"
                                    onClick={() => fileRemove(item)}>
                                    <DeleteIcon color="error"
                                                style={{cursor: 'pointer'}}/>
                                </IconButton>
                            </Tooltip>

                        </div>
                    ))}
                </div>
            ) : null}
            {renderDialog()}
        </>
    );
};

DropFileInput.propTypes = {
    onFileChange: PropTypes.func.isRequired,
};

export default DropFileInput;
