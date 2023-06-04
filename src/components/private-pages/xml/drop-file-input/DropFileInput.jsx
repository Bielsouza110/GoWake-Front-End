import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import './DropFileInput.css';
import {ImageConfig} from "../config/ImageConfig";
import uploadImg from '../../../../assets/cloud-upload-regular-240.png'

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

    const handleFileSubmit = (file) => {

        const index = fileList.indexOf(file);
        let juriList = [];//Array dos jurados
        let eventList = [];//Lista
        let athletesList = []; //Lista dos atletas
        if (fileList[index]) {
            const reader = new FileReader();
            reader.onload = () => {
                const fileUrl = reader.result;
                /*console.log(fileUrl);*/

                fetch(fileUrl).then(response => {

                    return response.text();
                }).then(xmlString => {
                    const xmlDocument = new DOMParser().parseFromString(xmlString, "text/xml");

                    const events = xmlDocument.querySelectorAll("events");
                    const officials = xmlDocument.querySelectorAll("officials");
                    const athletes = xmlDocument.querySelectorAll("athletes");


                    /*for (const event of events) {
                        const code_Event = event.querySelector("code").textContent;
                        const rounds = event.querySelector("rounds");
                        const classEvent = event.querySelector("event_class");
                        const name = event.querySelector("name");
                        eventList.push({
                            code: code_Event,
                            rounds: rounds,
                            classEvent: classEvent,
                            name: name
                        })
                        /* console.log(eventList);*/
                    //}

                    for (const official of officials) {
                        const iwwfID = official.querySelector("iwwfid").textContent;
                        const position = official.querySelector("position").textContent;
                        const lastName = official.querySelector("last_name").textContent;
                        const firstName = official.querySelector("first_name").textContent;
                        const qualification = official.querySelector("qualification");
                        const country = official.querySelector("country").textContent;
                        const region = official.querySelector("region").textContent;
                        /*console.log(iwwfID, position, lastName,firstName,qualification,country,region);*/
                        juriList.push({
                            id: iwwfID,
                            category: position,
                            name: lastName + " " + firstName,
                            qualification: qualification,
                            country: country,
                            region: region
                        });
                    }
                    /*console.log(juriList);*/

                    for (const athlete of athletes) {
                        const fed_id = athlete.querySelector("fed_id").textContent;
                        const lastName = athlete.querySelector("last_name").textContent;
                        const firstName = athlete.querySelector("first_name").textContent;
                        const country = athlete.querySelector("country").textContent;
                        const gender = athlete.querySelector("gender").textContent;
                        const birthYear = athlete.querySelector("year_of_birth").textContent;
                        const code = athlete.querySelector("code").textContent;
                        const division = athlete.querySelector("division");
                        const entry_type = athlete.querySelector("entry_type","EntryType");
                        const participation = athlete.querySelector("participation").textContent;
                        const category = athlete.querySelector("real_category").textContent;
                        const competitionCategory = athlete.querySelector("category_in_competition").textContent;
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

                    console.log(athletesList);
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
                                            onClick={() => handleFileSubmit(item)}>Check
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