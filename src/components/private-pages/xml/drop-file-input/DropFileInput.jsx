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
import axios from "axios";
import {getEndpointCreateAthlete, postXML} from "../../../../api/Urls";
import {Error as ErrorIcon} from '@material-ui/icons';

let juriList2 = [];//Array global dos jurados
let eventList2 = [];//Lista global dos eventos --> só pode ter 1 competição por XML, apesar de ser só 1 tive que fazer num array
let athletesList2 = []; //Lista global dos atletas
let competitionList2 = [];
let index = 0;
//let availableToSubmit = false;
const DropFileInput = (props) => {
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const clear = () => {
        juriList2 = [];
        eventList2 = [];
        athletesList2 = [];
        competitionList2 = [];
        index = 0;
        //availableToSubmit = false;
    }

    const [fileList, setFileList] = useState([]);
    const wrapperRef = useRef(null);
    const [popUpInfo, setPopUpInfo] = useState(null);
    const [openInvalidXMLInput, setOpenInvalidXMLInput] = useState(null);//Variável que guarda se ficheiro selecionado é válido
    const [openInvalidXMLFields, setOpenInvalidXMLFields] = useState(null);//Variável que vai verificar os campos
    const [showDialog, setDialog] = useState(true);
//const [availableToSubmit,setAvailableToSubmit]=useState(null);
    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.add('dragover');
    const [competitionList, setCompetitionList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [athletesList, setAthletesList] = useState([]);
    const [juriList, setJuriList] = useState([]);
    const onFileDrop = (e) => {
        const newFile = e.target.files[0];

        if (newFile) {
            if (newFile.name.endsWith('.xml') || newFile.name.endsWith('.XML')) {
                openDialogXMLInput(null);
                const updatedList = [...fileList, newFile];
                setFileList(updatedList);
                props.onFileChange(updatedList);
            } else {
                openDialogXMLInput(1);
            }
        }
    }

    const fileRemove = (file, index) => {
        if (file != null) {
            const updatedList = [...fileList];
            updatedList.splice(fileList.indexOf(file), 1);
            setFileList(updatedList);
            props.onFileChange(updatedList);

        } else {
            const updatedList = [...fileList];
            updatedList.splice(index, 1);
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    };

    const openDialog = (index) => {
        setPopUpInfo(index);
    };

    const closeDialog = () => {
        setPopUpInfo(null);
    };

    const openDialogXMLInput = (index) => {
        setOpenInvalidXMLInput(index);
    };

    const closeDialogXMLInput = () => {
        setOpenInvalidXMLInput(null);
    };

    const openDialogXMLFields = (index) => {
        setOpenInvalidXMLFields(index);
    };

    const closeDialogXMLFields = () => {
        setOpenInvalidXMLFields(null);
    };

    const submitXML = async () => {




        //const athlete_eventsJson = JSON.stringify(athlete_events);
        //const a = JSON.stringify(athletesList);
        //console.log(a);

        //const oi = 2;
        //console.log(competitionList[0].code)
        //console.log(competitionList[0].code.toString())

        //if (oi === 5) {
        const data = {
            code: competitionList[0].code,
            discipline: competitionList[0].discipline,
            name: competitionList[0].name,
            organizing_country: competitionList[0].orgCountry,
            tournament_type: competitionList[0].tournament_type,
            venue: competitionList[0].venue,
            site_code: competitionList[0].site_code,
            age_groups: competitionList[0].age_groups,
            beginning_date: competitionList[0].startDate,
            end_date: competitionList[0].endDate,
            athletes: athletesList.map((athlete) => ({
                events: [],
                fed_id: athlete.id,
                first_name: athlete.firstName,
                last_name: athlete.lastName,
                country: athlete.country,
                gender: athlete.gender,
                year_of_birth: athlete.year,
            })),
            events: eventList.map((event) => ({
                rounds: event.rounds,
                event_class: event.classEvent,
                name: event.name,
                code: event.code,
            })),
            athlete_events: athletesList.map((athlete) => ({
                division: athlete.division,
                entry_type: athlete.entry_type,
                participation: athlete.participation,
                real_category: athlete.category,
                category_in_competition: athlete.competitionCategory,
                code: athlete.code,
            })),
            officials: juriList.map((juri) => ({
                iwwfid: juri.id,
                position: juri.category,
                first_name: juri.firstName,
                last_name: juri.lastName,
                qualification: juri.qualification,
                country: juri.country,
                region: juri.region,
            })),
        };


        try {
            const response = await axios.post(postXML("submitXML"), data, {
                headers: {
                    Authorization: `Token ${usuarioSalvo.token}`,
                },
            });
            console.log("deu certo ");

        } catch (error) {
            console.log("deu erro");
            console.error(error.request.response);
        }
        //}
    };


    const handleFileSubmit = async (file, lockPopUp) => {
        clear();
        index = fileList.indexOf(file);
        //console.log("boas");
        let count = 0;
        if (fileList[index]) {

            const reader = new FileReader();
            reader.onload = () => {
                const fileUrl = reader.result;
                /*console.log(fileUrl);*/
                fetch(fileUrl).then((response) => response.text()).then(xmlString => {

                    const xmlDocument = new DOMParser().parseFromString(xmlString, "text/xml");
                    //const competitions = xmlDocument.querySelectorAll("");//ver mais tarde sobre o inicio do XML
                    const events = xmlDocument.querySelectorAll("events");
                    // const eventsValue = events ? events.textContent : '';

                    const officials = xmlDocument.querySelectorAll("officials");
                    //const officialsValue = officials ? officials.textContent : '';

                    const athletes = xmlDocument.querySelectorAll("athletes");
                    //const athletesValue = athletes ? athletes.textContent : '';

                    try {
                        const discipline = xmlDocument.querySelector("discipline, Discipline,DISCIPLINE");
                        const disciplineValue = discipline ? discipline.textContent : '';

                        const code = xmlDocument.querySelector("code,Code,CODE");
                        const codeValue = code ? code.textContent : '';

                        const name = xmlDocument.querySelector("name,Name,NAME");
                        const nameValue = name ? name.textContent : '';

                        const orgCountry = xmlDocument.querySelector("organizing_country,OrganizingCountry,ORGANIZINGCOUNTRY,Organizing_Country");
                        const orgCountryValue = orgCountry ? orgCountry.textContent : '';

                        const tournament_type = xmlDocument.querySelector("tournament_type,TournamentType,TOURNNAMENTTYPE,Tournament_type");
                        const tournament_typeValue = tournament_type ? tournament_type.textContent : '';

                        const venue = xmlDocument.querySelector("venue,Venue,VENUE");
                        const venueValue = venue ? venue.textContent : '';

                        const site_code = xmlDocument.querySelector("site_code,SiteCode,SITECODE,Site_Code");
                        const site_codeValue = site_code ? site_code.textContent : '';

                        const startDate = xmlDocument.querySelector("beginning_date,BeginningDate,BEGINNINGDATE,Beginning_Date");
                        const startDateValue = startDate ? startDate.textContent : '';

                        const endDate = xmlDocument.querySelector("end_date,EndDate,ENDDATE,End_Date");
                        const endDateValue = endDate ? endDate.textContent : '';

                        const age_groups = xmlDocument.querySelector("age_groups,AgeGroup,AGEGROUP,Age_Groups");
                        const age_groupsValue = age_groups ? age_groups.textContent : '';

                        competitionList2.push({
                            discipline: disciplineValue,
                            code: codeValue,
                            name: nameValue,
                            orgCountry: orgCountryValue,
                            tournament_type: tournament_typeValue,
                            venue: venueValue,
                            site_code: site_codeValue,
                            startDate: startDateValue,
                            endDate: endDateValue,
                            age_groups: age_groupsValue,
                            availableToSubmit: false
                        });
                        setCompetitionList(competitionList2);

                    } catch (error) {
                        console.error('Ocorreu um erro ao processar as informações principais:', error);
                    }


                    for (const event of events) {
                        try {
                            if (count === 0) {
                                const code_Event = event.querySelector("code,Code,CODE");
                                const code_EventValue = code_Event ? code_Event.textContent : '';

                                const rounds = event.querySelector("rounds,Rounds,ROUNDS");
                                const roundsValue = rounds ? rounds.textContent : '';

                                const classEvent = event.querySelector("event_class,Event_Class,EVENT_CLASS");
                                const classEventValue = classEvent ? classEvent.textContent : '';

                                const name = event.querySelector("name,Name,NAME");
                                const nameValue = name ? name.textContent : '';

                                if (nameValue.toLowerCase() !== "wakeboard") {
                                    break;
                                }

                                eventList2.push({
                                    code: code_EventValue,
                                    rounds: roundsValue,
                                    classEvent: classEventValue,
                                    name: nameValue
                                });
                                setEventList(eventList2);
                                count++;
                            } else {
                                break;
                            }
                        } catch (error) {
                            console.error('Ocorreu um erro ao processar os eventos:', error);
                        }
                    }


                    for (const official of officials) {
                        try {
                            const iwwfID = official.querySelector("iwwfid,Iwwfid,IWWFID");
                            const iwwfIDValue = iwwfID ? iwwfID.textContent : '';

                            const position = official.querySelector("position,Position,POSITION");
                            const positionValue = position ? position.textContent : '';

                            const lastName = official.querySelector("last_name,LastName,LASTNAME,Last_Name");
                            const lastNameValue = lastName ? lastName.textContent : '';

                            const firstName = official.querySelector("first_name,FirstName,FIRSTNAME,First_Name");
                            const firstNameValue = firstName ? firstName.textContent : '';

                            const qualification = official.querySelector("qualification,Qualification,QUALIFICATION");
                            const qualificationValue = qualification ? qualification.textContent : '';

                            const country = official.querySelector("country,Country,COUNTRY");
                            const countryValue = country ? country.textContent : '';

                            const region = official.querySelector("region,Region,REGION");
                            const regionValue = region ? region.textContent : '';

                            juriList2.push({
                                id: iwwfIDValue,
                                category: positionValue,
                                lastName: lastNameValue,
                                firstName: firstNameValue,
                                qualification: qualificationValue,
                                country: countryValue,
                                region: regionValue
                            });
                            setJuriList(juriList2);
                        } catch (error) {
                            console.error('Ocorreu um erro ao processar os oficiais:', error);
                        }
                    }


                    for (const athlete of athletes) {
                        try {
                            const fed_id = athlete.querySelector("fed_id,FedId,FEDID,Fed_Id");
                            const fed_idValue = fed_id ? fed_id.textContent : '';

                            const lastName = athlete.querySelector("last_name,LastName,LASTNAME,Last_Name");
                            const lastNameValue = lastName ? lastName.textContent : '';

                            const firstName = athlete.querySelector("first_name,FirstName,FIRSTNAME,First_Name");
                            const firstNameValue = firstName ? firstName.textContent : '';

                            const country = athlete.querySelector("country,Country,COUNTRY");
                            const countryValue = country ? country.textContent : '';

                            const gender = athlete.querySelector("gender,Gender,GENDER");
                            const genderValue = gender ? gender.textContent : '';

                            const birthYear = athlete.querySelector("year_of_birth,YearOfBirth,YEAROFBIRTH");
                            const birthYearValue = birthYear ? birthYear.textContent : '';

                            const code = athlete.querySelector("code,Code,CODE");
                            const codeValue = code ? code.textContent : '';

                            const division = athlete.querySelector("division,Division,DIVISION");
                            const divisionValue = division ? division.textContent : '';

                            const entry_type = athlete.querySelector("entry_type,EntryType,ENTRYTYPE");
                            const entry_typeValue = entry_type ? entry_type.textContent : '';

                            const participation = athlete.querySelector("participation,Participation,PARTICIPATION");
                            const participationValue = participation ? participation.textContent : '';

                            const category = athlete.querySelector("real_category,RealCategory,REALCATEGORY,Real_Category");
                            const categoryValue = category ? category.textContent : '';

                            const competitionCategory = athlete.querySelector("category_in_competition,CategoryInCompetition,CATEGORYINCOMPETITION,Category_In_Competition");
                            const competitionCategoryValue = competitionCategory ? competitionCategory.textContent : '';

                            athletesList2.push({
                                id: fed_idValue,
                                lastName: lastNameValue,
                                firstName: firstNameValue,
                                country: countryValue,
                                gender: genderValue,
                                year: birthYearValue,
                                code: codeValue,
                                division: divisionValue,
                                entry_type: entry_typeValue,
                                participation: participationValue,
                                category: categoryValue,
                                competitionCategory: competitionCategoryValue
                            });
                            setAthletesList(athletesList2);
                        } catch (error) {
                            console.error('Ocorreu um erro ao processar os atletas:', error);
                        }
                    }
                    if (eventList2.length === 0 || athletesList2.length === 0 || juriList2.length === 0 || competitionList2.length === 0) {
                        console.log(eventList.length)
                        console.log(athletesList.length)
                        console.log(juriList.length)
                        console.log(competitionList.length)
                        openDialogXMLFields(1);
                        {
                            setDialog(false)
                        }
                    } else {
                        openDialogXMLFields(null);
                        {
                            setDialog(true)
                        }
                    }
                    if (lockPopUp === false) {
                        openDialog(1);//se tiver diferente de null é para dar indicação que leu todos os dados e é para mostrar a info
                    } else {
                        openDialog(2);// = 1 é para mostrar a popup, a 2 é para submeter direto
                    }


                }).catch(error => {
                    console.error("XML inválido");
                });

            };

            reader.readAsDataURL(fileList[index]);
        }
    };

    const getCompetition = () => {
        if (popUpInfo !== null && openInvalidXMLFields === null) {
            //console.log("Aqui --> " + competitionList.length);
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
        return null;
    }

    const getJuri = () => {
        if (popUpInfo !== null && openInvalidXMLFields === null) {
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

        return null; // Retorna null se popUpInfo for null
    };

    const getAthletes = () => {
        if (popUpInfo !== null && openInvalidXMLFields === null) {
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

    const getEvent = () => {

        if (popUpInfo !== null && openInvalidXMLFields === null) {
            return (
                <>

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

                    </div>

                </>


            )
        }
        return null;
    }

    const show_XMl_info = () => {


        if (popUpInfo === 1 && openInvalidXMLFields === null && showDialog === true) {
            //competitionList[0].availableToSubmit=true;

            return (
                <Dialog open={true} onClose={closeDialog} maxWidth="lg">
                    {/*maxWidth="md" fullWidth = "800"*/}
                    {/*sx={{width: '100%', maxWidth: '100%'}}*/}

                    <DialogTitle>XML Preview</DialogTitle>
                    <DialogContent>

                        {getCompetition()}
                        {getEvent()}
                        {getJuri()}
                        {getAthletes()}

                        <DialogContentText>
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions>

                        <DialogActions>
                            <Button onClick={() => {
                                fileRemove(null, index);
                                closeDialog()
                            }}>Submit</Button>
                        </DialogActions>
                        <Button onClick={closeDialog}>Close</Button>
                    </DialogActions>

                </Dialog>
            );
        }
        return null;
    };

    const verifyFileInput = () => {

        if (openInvalidXMLInput !== null) {
            return (
                <Dialog open={true} onClose={closeDialogXMLInput} className="error-dialog">
                    <DialogTitle className="error-dialog-title">
                        <ErrorIcon className="error-dialog-icon"/>
                        Error
                    </DialogTitle>
                    <DialogContent className="error-dialog-content">The selected file is invalid. Please choose a valid
                        XML file.</DialogContent>
                    <DialogActions className="error-dialog-actions">
                        <Button onClick={closeDialogXMLInput} color="primary" className="error-dialog-button">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

            );
        }
        return null;
    };


    const verifyFileFields = () => {
        if (openInvalidXMLFields !== null) {
            return (
                <Dialog open={true} onClose={closeDialogXMLFields} className="error-dialog">
                    <DialogTitle className="error-dialog-title">
                        <ErrorIcon className="error-dialog-icon"/>
                        Error
                    </DialogTitle>
                    <DialogContent className="error-dialog-content">Wrong structure or the competition is not
                        wakeboarding.</DialogContent>
                    <DialogActions className="error-dialog-actions">
                        <Button onClick={closeDialogXMLFields} color="primary" className="error-dialog-button">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

            );
        }
        return null;
    }

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

                <input type="file" value="" accept=".xml" onChange={onFileDrop}/>

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
                                <IconButton
                                    id="drop-file-item_submit"
                                    onClick={() => {
                                        handleFileSubmit(item, true);
                                        submitXML()

                                        //fileRemove(null, index);
                                    }}
                                    //style={{ display: 'none' }}
                                >
                                    <PublishIcon style={{color: 'forestgreen', cursor: 'pointer'}}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Preview" className="tooltip-gender">
                                <IconButton id="drop-file-item_preview" onClick={() => handleFileSubmit(item, false)}>
                                    <Visibility style={{color: '#4267b2', cursor: 'pointer'}}/>
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
            {verifyFileInput()}
            {verifyFileFields()}
            {show_XMl_info()}
        </>
    );
};

DropFileInput.propTypes = {
    onFileChange: PropTypes.func.isRequired,
};

export default DropFileInput;