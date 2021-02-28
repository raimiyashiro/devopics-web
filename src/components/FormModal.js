import React, { useState, useEffect } from 'react';

import { Modal, Button, Input, InputLabel, NativeSelect, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

export default function ModalForm({ event }) {
    const classes = useStyles();

    const [display, setDisplay] = useState(false);

    useEffect(() => {
        if (event != 0) {
            setDisplay(!display);
        };
    }, [event]);

    const api = process.env.REACT_APP_DEV_API;
    const [tags, setTags] = useState([]);

    const fetchTags = async () => {
        const response = await axios.get(`${api}/tags`);
        setTags(response.data);
        console.log(tags);
    }

    const [title, setTitle] = useState(null);
    const [url, setUrl] = useState(null);
    const [tag, setTag] = useState({});

    const [snack, setSnack] = useState(false);
    const [err, setErr] = useState(false);
    const [warn, setWarn] = useState(false);
    const [info, setInfo] = useState(false);


    const handleCloseAlert = () => {
        setSnack(false);
        setErr(false);
        setWarn(false);
        setInfo(false);
    }

    const handleSubmit = () => {
        if (title && url && tag.id) {
            console.log({
                title: title,
                url: url,
                tag: tag
            });
            const request = axios.post(`${api}/topics`, {
                title: title,
                url: url,
                tags: [tag]
            })
                .then(response => {
                    setSnack(true);
                })
                .catch(error => {
                    if (error.response.status && error.response.status === 400) {
                        setErr(true);
                    } else {
                        setWarn(true);
                    }
                });
        } else {
            // Highlight missing fields
            setInfo(true);
        }
    }

    useEffect(() => {
        fetchTags();
    }, []);


    return (
        <Modal
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            open={display}
            onClose={() => {
                setDisplay(false);
                handleCloseAlert();
            }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className={classes.paper}>
                <h1 id="simple-modal-title">Share your knowledge with us!</h1>
                <p id="simple-modal-description">
                    We want to create a hub where developers can find and suggest (?).
                </p>
                <Input placeholder={'Title (ex: Lambdas in Java)'}
                    autoFocus={true}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Input placeholder={'URL (ex: www.pane.la)'}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <div style={{ margin: '10px 0px 10px 0px' }}>
                    <InputLabel htmlFor="select">Tag</InputLabel>
                    <NativeSelect id="select">
                        {tags.map(tag =>
                            <option
                                key={tag.id}
                                value={tag.id}
                                onClick={() => setTag(tag)}
                            >
                                {tag.name}
                            </option>)}
                    </NativeSelect>
                </div>

                <Button
                    onClick={handleSubmit}
                    style={{
                        margin: '8px',
                        maxHeight: '36px',
                        color: '#fff',
                        backgroundColor: '#2ecc71'
                    }}
                >
                    {'Submit'}
                </Button>


                <Snackbar open={snack} autoHideDuration={5000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="success">
                        This is a success message!
                    </Alert>
                </Snackbar>
                <Snackbar open={err} autoHideDuration={5000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="error">
                        This is an error message!
                    </Alert>
                </Snackbar>
                <Snackbar open={warn} autoHideDuration={5000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="warning">
                        This is a warning message!
                    </Alert>
                </Snackbar>
                <Snackbar open={info} autoHideDuration={5000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="info">
                        This is an information message!
                    </Alert>
                </Snackbar>
            </div>
        </Modal>
    );
}