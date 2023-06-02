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
    const onFileDrop = (e) =>{
        const newFile = e.target.files[0];
        if(newFile) {
            const updatedList = [...fileList, newFile];
            setFileList((updatedList));
            props.onFileChange(updatedList);
        }
    }
    const fileRemove = (file) =>{
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file),1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
        console.log(file);
    }

    const handleFileSubmit = () => {
        if (fileList[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                const fileUrl = reader.result;
                console.log(fileUrl);
                // Perform further actions with the file URL

                fetch(fileUrl).then(response => {

                    return response.text();
                }).then(xmlString => {
                    const xmlDocument = new DOMParser().parseFromString(xmlString, "text/html");
                    const tutorials = xmlDocument.querySelectorAll("book");

                    for (const t of tutorials) {
                        const author = t.querySelector("author").textContent;
                        const title = t.querySelector("title").textContent;
                        const genre = t.querySelector("genre").textContent;
                        console.log(author, title, genre);
                    }
                });



            };
            reader.readAsDataURL(fileList[0]);
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
                                    <button  className="drop-file-preview_btn"  onClick={handleFileSubmit}>Check</button>
                                    <span className="drop-file-preview_item_del" onClick={()=> fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                    </div>
                ): null
            }

        </>

    );
}
DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}
export default DropFileInput;