import React from "react";
import _ from "lodash";

import { AnchorButton, Intent } from "@blueprintjs/core";

import { Icon } from "react-icons-kit";
import { remove } from 'react-icons-kit/fa/remove';

export default class ImageUploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedFiles: [],
            error: null,
        };
    }

    onFileLoad(e) {
        const file = e.target.files[0];

        if (file && file['type'].split('/')[0] === 'image') {
            let fileReader = new FileReader();
            fileReader.onload = () => {
                const file = {
                    data: fileReader.result,
                    isUploading: false
                }
                //Add file
                this.addLoadedFile(file);
            }

            fileReader.onabort = () => {
                alert("Reading Aborted");
            }

            fileReader.onerror = () => {
                alert("Reading ERROR!");
            }

            fileReader.readAsDataURL(file);
            this.setState({ error: null })
        } else {
            this.setState({ error: 'Можно загрузить только картинку!' })
        }
    }

    addLoadedFile(file) {
        this.setState((prevState) => ({
            loadedFiles: [
                ...prevState.loadedFiles,
                file
            ]
        }));
    }

    removeLoadedFile(file) {
        //Remove file from the State
        this.setState((prevState) => {
            let loadedFiles = prevState.loadedFiles;
            let newLoadedFiles = _.filter(loadedFiles, (ldFile) => {
                return ldFile != file;
            });
            return { loadedFiles: newLoadedFiles };
        });
    }

    onUpload() {
        const { loadedFiles } = this.state;

        if (loadedFiles.length < 1) {
            this.setState({ error: 'Загрузите хотя бы 1 фото!' })
        }
        else {
            this.setState({ error: null })
            loadedFiles.map((file, index) => {
                console.log('base64 код ' + (index + 1) + ' картинки: ' + file.data);
            });
        }
    }

    render() {
        const { loadedFiles, error } = this.state;

        return (
            <div
                className="inner-container"
                style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                <div className="sub-header">Загрузчик картинок. Перетащите или выберите картинки для загрузки.</div>
                <div className="draggable-container">
                    <input
                        type="file"
                        accept='image/*'
                        id="file-browser-input"
                        name="file-browser-input"
                        ref={input => this.fileInput = input}
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        onChange={this
                            .onFileLoad
                            .bind(this)} />
                    <div className="files-preview-container ip-scrollbar">
                        {loadedFiles.map((file, idx) => {
                            return <div className="file" key={idx}>
                                <img src={file.data} />
                                <div className="container">
                                    <span className="remove-btn" onClick={() => this.removeLoadedFile(file)}>
                                        <Icon icon={remove} size={19} />
                                    </span>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="helper-text">Область для перетаскивания</div>
                    <div className="file-browser-container">
                        <AnchorButton
                            text="Выбрать..."
                            intent={Intent.PRIMARY}
                            minimal={true}
                            onClick={() => this.fileInput.click()} />
                    </div>
                </div>
                <AnchorButton
                    text="Отправить"
                    intent={Intent.SUCCESS}
                    onClick={() => this.onUpload()} />
                {error && <p className="error">{error}</p>}
            </div>
        );

    }

}