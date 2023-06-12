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

const DropFileInput = props => {


    const [fileList, setFileList] = useState([]);
    const wrapperRef = useRef(null);
    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.add('dragover');
    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList((updatedList));
            props.onFileChange(updatedList);
        }
    }
    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);//splice serve para add, remover ou alterar algo no array
        setFileList(updatedList);
        props.onFileChange(updatedList);
        console.log(file);
    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileSubmit = (file) => {

        const index = fileList.indexOf(file);
        let count = 0;
        let juriList = [];//Array dos jurados
        let eventList = [];//Lista dos eventos --> só pode ter 1 competição por XML, apesar de ser só 1 tive que fazer num array
        let athletesList = []; //Lista dos atletas
        let competitionList = [];

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
                    console.log(competitionList);


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
                        /*console.log(iwwfID, position, lastName,firstName,qualification,country,region);*/
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
                    /*console.log(juriList);*/

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

                    //console.log(athletesList);
                });

            };

            reader.readAsDataURL(fileList[index]);

        }

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
                    <img src={uploadImg} alt={""}/>
                    <p>Drag & Drop your files here!</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview_title">
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview_item">
                                    <img src={ImageConfig[item.type.split('/')[1] || ImageConfig['default']]} alt=""/>
                                    <div className="drop-file-preview_item_info">
                                        <p>{item.name}</p>
                                        {/*<p>{item.size}</p>*/}
                                    </div>
                                    <button className="drop-file-preview_btn"
                                            /*onClick={() => handleFileSubmit(item)}>Check*/
                                            variant="contained" onClick = {handleOpen} >Check



                                        <Dialog open={open} onClose={handleClose}>
                                            <DialogTitle>Pop Teste</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Bla Bla Bla
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Fechar</Button>
                                            </DialogActions>
                                        </Dialog>




                                    </button>
                                    <span className="drop-file-preview_item_del"
                                          onClick={() => fileRemove(item)}>x</span>

                                </div>

                            ))

                        }
                    </div>
                ) : null
            }

        </>

    );
}
DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}
export default DropFileInput;