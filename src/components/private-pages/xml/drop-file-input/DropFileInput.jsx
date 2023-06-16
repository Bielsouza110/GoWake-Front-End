import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import './DropFileInput.css';
import {ImageConfig} from "../config/ImageConfig";
import uploadImg from '../../../../assets/cloud-upload-regular-240.png'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';


let juriList = [];//Array global dos jurados
let eventList = [];//Lista global dos eventos --> só pode ter 1 competição por XML, apesar de ser só 1 tive que fazer num array
let athletesList = []; //Lista global dos atletas
let competitionList = [];

const DropFileInput = (props) => {
    const clear = () => {
        juriList = [];
        eventList = [];
        athletesList = [];
        competitionList = [];
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

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    };

    const handleOpenDialog = (index) => {
        setOpenDialogIndex(index);
    };

    const handleCloseDialog = () => {
        setOpenDialogIndex(null);
    };


    const handleFileSubmit = (file) => {
        clear();


        const index = fileList.indexOf(file);
        let count = 0;
        // let juriList = [];//Array dos jurados
        //let eventList = [];//Lista dos eventos --> só pode ter 1 competição por XML, apesar de ser só 1 tive que fazer num array
        //let athletesList = []; //Lista dos atletas
        //let competitionList = [];

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
                    //console.log(competitionList);

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
                    //console.log(eventList);


                    for (const official of officials) {
                        const iwwfID = official.querySelector("iwwfid,Iwwfid").textContent;
                        const position = official.querySelector("position,Position").textContent;
                        const lastName = official.querySelector("last_name,LastName").textContent;
                        const firstName = official.querySelector("first_name,FirstName").textContent;
                        const qualification = official.querySelector("qualification,Qualification");
                        const country = official.querySelector("country,Country").textContent;
                        const region = official.querySelector("region,Region").textContent;

                        juriList.push({
                            id: iwwfID,
                            category: position,
                            lastName: lastName,
                            firstName: firstName,
                            qualification: qualification,
                            country: country,
                            region: region
                        });
                    }
                    // console.log(juriList);


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
                    //console.log("primeiro")
                    handleOpenDialog(1);
                });


            };
            //console.log("segundo");
            reader.readAsDataURL(fileList[index]);
        }


        athletesList.map((item, index) => {
            console.log({item});
        })

        //console.log("terceiro");

    };


    const displayCompetition = () => {
        if (openDialogIndex !== null) {
            return (
                <div>
                    {/*<h5>Competition name</h5>*/}
                    <table className="competition-table">
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>Discipline</th>
                            <th>Country</th>
                            <th>Type</th>
                            <th>Venue</th>
                            <th>Site code</th>
                            <th>Group Age</th>
                            <th>Start date</th>
                            <th>End date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{competitionList[0].code}</td>
                            <td>{competitionList[0].discipline}</td>
                            <td>{competitionList[0].orgCountry}</td>
                            <td>{competitionList[0].tournament_type}</td>
                            <td>{competitionList[0].site_code}</td>
                            <td>{competitionList[0].venue}</td>
                            <td>{competitionList[0].age_groups}</td>
                            <td>{competitionList[0].startDate}</td>
                            <td>{competitionList[0].endDate}</td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            )
        }
    }

    const displayEvent=()=>{
        if (openDialogIndex !== null) {
            return (
                <div className="event-container">
                    <div className="event">
                        <p>Event: <span className="value">{eventList[0].name}</span></p>
                        <p>Code: <span className="value">{eventList[0].code}</span></p>
                        <p>Class event: <span className="value">{eventList[0].classEvent}</span></p>
                        <p>Rounds: <span className="value">{eventList[0].rounds}</span></p>
                    </div>
                </div>

            )
        }
    }


    const renderDialog = () => {

        if (openDialogIndex !== null) {
            console.log(athletesList[0].id);

            return (
                <Dialog open={true} onClose={handleCloseDialog} maxWidth="lg" fullWidth="1200">
                    {/*maxWidth="md" fullWidth = "800"*/}
                    {/*sx={{width: '100%', maxWidth: '100%'}}*/}

                    <DialogTitle>XML Preview</DialogTitle>
                    <DialogContent>
                        {displayEvent()}
                        <div>
                            <p>Competition name: <span
                                className="value">{competitionList[0].name}</span></p>

                        </div>
                        {displayCompetition()}
                        <DialogContentText>

                        </DialogContentText>

                        <DialogContentText>


                        </DialogContentText>

                        {/*athletesList.map((item, index) => (
                            <div key={index}>
                                <p>{"Aqui " + item.id}</p>
                            </div>
                        ))*/}


                    </DialogContent>

                    <DialogActions>

                        <Button onClick={handleCloseDialog}>Fechar</Button>
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
                            {/*<button className="drop-file-preview_btn" variant="contained" onClick={() => handleOpenDialog(index)}>
                                Check
                            </button>*/}
                            <button className="drop-file-preview_btn" variant="contained"
                                    onClick={() => handleFileSubmit(item)}>
                                Check
                            </button>
                            <span className="drop-file-preview_item_del" onClick={() => fileRemove(item)}> x </span>
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
