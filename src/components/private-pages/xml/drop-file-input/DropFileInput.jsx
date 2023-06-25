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

let juriList = [];//Array global dos jurados
let eventList = [];//Lista global dos eventos --> só pode ter 1 competição por XML, apesar de ser só 1 tive que fazer num array
let athletesList = []; //Lista global dos atletas
let competitionList = [];
let index = 0;
//let mostra = true;

const DropFileInput = (props) => {
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

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
    const [openInvalidXMLInput, setOpenInvalidXMLInput] = useState(null);//Variável que guarda se ficheiro selecionado é válido
    const [openInvalidXMLFields, setOpenInvalidXMLFields] = useState(null);//Variável que vai verificar os campos
    const [showDialog, setDialog] = useState(true);
    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.add('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];

        if (newFile) {
            if (newFile.name.endsWith('.xml') || newFile.name.endsWith('.XML')) {
                handleOpenDialogXMLInput(null);
                const updatedList = [...fileList, newFile];
                setFileList(updatedList);
                props.onFileChange(updatedList);
            } else {
                handleOpenDialogXMLInput(1);
            }
        }
    };

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

    const handleOpenDialog = (index) => {
        setOpenDialogIndex(index);
    };

    const handleCloseDialog = () => {
        setOpenDialogIndex(null);
    };

    const handleOpenDialogXMLInput = (index) => {
        setOpenInvalidXMLInput(index);
    };

    const handleCloseDialogXMLInput = () => {
        console.log("Deveria ser o segundo-meio");
        setOpenInvalidXMLInput(null);
    };

    const handleOpenDialogXMLFields = (index) => {
        setOpenInvalidXMLFields(index);
    };

    const handleCloseDialogXMLFields = () => {
        setOpenInvalidXMLFields(null);
    };


    const submitXML = async () => {

        const data = {
            code: '22ESP010',
            discipline: 'Wakeboard Boat',
            name: 'CAMPEONATO SEIXAL WAKEBOARD',
            organizing_country: 'PT',
            tournament_type: 'NatCH',
            venue: 'SEIXAL',
            site_code: 'PTSEIXAL',
            age_groups: 'IWWF',
            beginning_date: '2023-02-19T15:02:57Z',
            end_date: '2023-02-21T15:02:59Z',
            athletes: [
                {
                    events: [],
                    fed_id: 'ESP9813111',
                    first_name: 'Miguel',
                    last_name: 'Gomes',
                    country: 'PT',
                    gender: 'M',
                    year_of_birth: 1995,
                },
            ],
            events: [
                {
                    rounds: 5,
                    event_class: '5 STAR',
                    name: 'Wakeskate seixal',
                    code: '801',
                },
            ],
            athlete_events: [
                {
                    division: '',
                    entry_type: 'IP',
                    participation: true,
                    real_category: 'U100',
                    category_in_competition: 'U100',
                    code: '802',
                },
                {
                    division: '',
                    entry_type: 'IP',
                    participation: true,
                    real_category: 'U110',
                    category_in_competition: 'U110',
                    code: '801',
                },
            ],
            officials: [
                {
                    iwwfid: 'M00200',
                    position: 'Judge',
                    first_name: 'Miguel',
                    last_name: 'Milhazes',
                    qualification: 'WBJ1',
                    country: 'POR',
                    region: 'Europe',
                },
            ],
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
                    const eventsValue = events ? events.textContent : '';

                    const officials = xmlDocument.querySelectorAll("officials");
                    const officialsValue = officials ? officials.textContent : '';

                    const athletes = xmlDocument.querySelectorAll("athletes");
                    const athletesValue = athletes ? athletes.textContent : '';

                    try {
                        const discipline = xmlDocument.querySelector("discipline, Discipline,DISCIPLINE").textContent;
                        const disciplineValue = discipline ? discipline.textContent : '';

                        const code = xmlDocument.querySelector("code,Code,CODE").textContent;
                        const codeValue = code ? code.textContent : '';

                        const name = xmlDocument.querySelector("name,Name,NAME").textContent;
                        const nameValue = name ? name.textContent : '';

                        const orgCountry = xmlDocument.querySelector("organizing_country,OrganizingCountry,ORGANIZINGCOUNTRY,Organizing_Country").textContent;
                        const orgCountryValue = orgCountry ? orgCountry.textContent : '';

                        const tournament_type = xmlDocument.querySelector("tournament_type,TournamentType,TOURNNAMENTTYPE,Tournament_type").textContent;
                        const tournament_typeValue = tournament_type ? tournament_type.textContent : '';

                        const venue = xmlDocument.querySelector("venue,Venue,VENUE").textContent;
                        const venueValue = venue ? venue.textContent : '';

                        const site_code = xmlDocument.querySelector("site_code,SiteCode,SITECODE,Site_Code").textContent;
                        const site_codeValue = site_code ? site_code.textContent : '';

                        const startDate = xmlDocument.querySelector("beginning_date,BeginningDate,BEGINNINGDATE,Beginning_Date").textContent;
                        const startDateValue = startDate ? startDate.textContent : '';

                        const endDate = xmlDocument.querySelector("end_date,EndDate,ENDDATE,End_Date").textContent;
                        const endDateValue = endDate ? endDate.textContent : '';

                        const age_groups = xmlDocument.querySelector("age_groups,AgeGroup,AGEGROUP,Age_Groups").textContent;
                        const age_groupsValue = age_groups ? age_groups.textContent : '';

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
                        });
                    } catch (error) {
                        console.error('Ocorreu um erro ao processar as informações principais:', error);
                    }


                    for (const event of events) {
                        try {
                            if (count === 0) {
                                const code_Event = event.querySelector("code,Code,CODE").textContent;
                                const code_EventValue = code_Event ? code_Event.textContent : '';

                                const rounds = event.querySelector("rounds,Rounds,ROUNDS").textContent;
                                const roundsValue = rounds ? rounds.textContent : '';

                                const classEvent = event.querySelector("event_class,Event_Class,EVENT_CLASS").textContent;
                                const classEventValue = classEvent ? classEvent.textContent : '';

                                const name = event.querySelector("name,Name,NAME");
                                const nameValue = name ? name.textContent : '';

                                if (nameValue.toLowerCase()!=="wakeboard"){
                                    break;
                                }

                                eventList.push({
                                    code: code_Event,
                                    rounds: rounds,
                                    classEvent: classEvent,
                                    name: nameValue
                                });

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
                            const iwwfID = official.querySelector("iwwfid,Iwwfid,IWWFID").textContent;
                            const iwwfIDValue = iwwfID ? iwwfID.textContent : '';

                            const position = official.querySelector("position,Position,POSITION").textContent;
                            const positionValue = position ? position.textContent : '';

                            const lastName = official.querySelector("last_name,LastName,LASTNAME,Last_Name").textContent;
                            const lastNameValue = lastName ? lastName.textContent : '';

                            const firstName = official.querySelector("first_name,FirstName,FIRSTNAME,First_Name").textContent;
                            const firstNameValue = firstName ? firstName.textContent : '';

                            const qualification = official.querySelector("qualification,Qualification,QUALIFICATION");
                            const qualificationValue = qualification ? qualification.textContent : '';

                            const country = official.querySelector("country,Country,COUNTRY").textContent;
                            const countryValue = country ? country.textContent : '';

                            const region = official.querySelector("region,Region,REGION").textContent;
                            const regionValue = region ? region.textContent : '';

                            juriList.push({
                                id: iwwfID,
                                category: position,
                                lastName: lastName,
                                firstName: firstName,
                                qualification: qualificationValue,
                                country: country,
                                region: region
                            });
                        } catch (error) {
                            console.error('Ocorreu um erro ao processar os oficiais:', error);
                        }
                    }


                    for (const athlete of athletes) {
                        try {
                            const fed_id = athlete.querySelector("fed_id,FedId,FEDID,Fed_Id").textContent;
                            const fed_idValue = fed_id ? fed_id.textContent : '';

                            const lastName = athlete.querySelector("last_name,LastName,LASTNAME,Last_Name").textContent;
                            const lastNameValue = lastName ? lastName.textContent : '';

                            const firstName = athlete.querySelector("first_name,FirstName,FIRSTNAME,First_Name").textContent;
                            const firstNameValue = firstName ? firstName.textContent : '';

                            const country = athlete.querySelector("country,Country,COUNTRY").textContent;
                            const countryValue = country ? country.textContent : '';

                            const gender = athlete.querySelector("gender,Gender,GENDER").textContent;
                            const genderValue = gender ? gender.textContent : '';

                            const birthYear = athlete.querySelector("year_of_birth,YearOfBirth,YEAROFBIRTH").textContent;
                            const birthYearValue = birthYear ? birthYear.textContent : '';

                            const code = athlete.querySelector("code,Code,CODE").textContent;
                            const codeValue = code ? code.textContent : '';

                            const division = athlete.querySelector("division,Division,DIVISION").textContent;
                            const divisionValue = division ? division.textContent : '';

                            const entry_type = athlete.querySelector("entry_type,EntryType,ENTRYTYPE").textContent;
                            const entry_typeValue = entry_type ? entry_type.textContent : '';

                            const participation = athlete.querySelector("participation,Participation,PARTICIPATION").textContent;
                            const participationValue = participation ? participation.textContent : '';

                            const category = athlete.querySelector("real_category,RealCategory,REALCATEGORY,Real_Category").textContent;
                            const categoryValue = category ? category.textContent : '';

                            const competitionCategory = athlete.querySelector("category_in_competition,CategoryInCompetition,CATEGORYINCOMPETITION,Category_In_Competition").textContent;
                            const competitionCategoryValue = competitionCategory ? competitionCategory.textContent : '';

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
                            });
                        } catch (error) {
                            console.error('Ocorreu um erro ao processar os atletas:', error);
                        }
                    }
                    if (eventList.length === 0 || athletesList.length === 0 || juriList.length === 0 || competitionList.length === 0) {

                        handleOpenDialogXMLFields(1);
                        {setDialog(false)}
                    } else {
                        {setDialog(true)}
                        handleOpenDialogXMLFields(null);
                    }
                    handleOpenDialog(1);
                }).catch(error => {
                    console.error("XML inválido");
                });

            };
            reader.readAsDataURL(fileList[index]);
        }

    };

    const displayCompetition = () => {
        if (openDialogIndex !== null && openInvalidXMLFields===null) {
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

    const displayJuri = () => {
        if (openDialogIndex !== null && openInvalidXMLFields===null) {
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
        if (openDialogIndex !== null && openInvalidXMLFields===null) {
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

        if (openDialogIndex !== null && openInvalidXMLFields===null) {
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

    const renderDialog = () => {
        if (openDialogIndex !== null && openInvalidXMLFields===null && showDialog === true  ) {

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
                                fileRemove(null, index);
                                handleCloseDialog()
                            }}>Submit</Button>
                        </DialogActions>
                        <Button onClick={handleCloseDialog}>Close</Button>
                    </DialogActions>

                </Dialog>
            );
        }
        return null;
    };

    const showInvalidDialogXMLInput = () => {
        if (openInvalidXMLInput !== null) {
            return (
                <Dialog open={true} onClose={handleCloseDialogXMLInput} className="error-dialog">
                    <DialogTitle className="error-dialog-title">
                        <ErrorIcon className="error-dialog-icon"/>
                        Error
                    </DialogTitle>
                    <DialogContent className="error-dialog-content">The selected file is invalid. Please choose a valid
                        XML file.</DialogContent>
                    <DialogActions className="error-dialog-actions">
                        <Button onClick={handleCloseDialogXMLInput} color="primary" className="error-dialog-button">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

            );
        }
        return null;
    };

    const showInvalidDialogXMLFields = () => {
        if (openInvalidXMLFields !== null) {
            return (
                <Dialog open={true} onClose={handleCloseDialogXMLFields} className="error-dialog">
                    <DialogTitle className="error-dialog-title">
                        <ErrorIcon className="error-dialog-icon"/>
                        Error
                    </DialogTitle>
                    <DialogContent className="error-dialog-content">Wrong structure or the competition is not
                        wakeboarding.</DialogContent>
                    <DialogActions className="error-dialog-actions">
                        <Button onClick={handleCloseDialogXMLFields} color="primary" className="error-dialog-button">
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
                            {openInvalidXMLFields===null &&(
                                <Tooltip title="Submit" className="tooltip-gender">
                                    <IconButton
                                        id="drop-file-item_submit"
                                        onClick={() => {
                                            submitXML();
                                            fileRemove(null, index);
                                        }}
                                    >
                                        <PublishIcon style={{color: 'forestgreen', cursor: 'pointer'}}/>
                                    </IconButton>
                                </Tooltip>

                            )}


                            <Tooltip title="Preview" className="tooltip-gender">
                                <IconButton id="drop-file-item_preview" onClick={() => handleFileSubmit(item)}>
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

            {showInvalidDialogXMLInput()}
            {showInvalidDialogXMLFields()}
            {renderDialog()}
        </>
    );
};

DropFileInput.propTypes = {
    onFileChange: PropTypes.func.isRequired,
};

export default DropFileInput;