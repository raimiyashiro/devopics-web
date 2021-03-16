import React, { useState, useEffect } from 'react';

import { Modal, Button, Input, InputLabel, NativeSelect, FormControl, Snackbar } from '@material-ui/core';
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
    const api = process.env.REACT_APP_DEV_API;

    const [open, setOpen] = useState(false);

    const [tags, setTags] = useState([]);

    const [title, setTitle] = useState(null);
    const [url, setUrl] = useState(null);
    const [tag, setTag] = useState(null);

    const fetchTags = async () => {
        await axios.get(`${api}/tags`, { headers: { "Access-Control-Allow-Origin": "*" } })
            .then(res => {
                setTags(res.data);
            });
    }

    useEffect(() => {
        if (event != 0) {
            setOpen(!open);
        };
        fetchTags();
    }, [event]);

    const [successSnack, setSuccessSnack] = useState(false);
    const [errSnack, setErrSnack] = useState(false);
    const [warnSnack, setWarnSnack] = useState(false);
    const [infoSnack, setInfoSnack] = useState(false);

    const handleCloseAlert = () => {
        if (successSnack || warnSnack) {
            setSuccessSnack(false);
            setWarnSnack(false);
            setOpen(false);
        } else {
            setInfoSnack(false);
            setErrSnack(false);
        }
    }

    const handleSubmit = () => {
        if (title && url && tag) {
            const body = {
                title: title,
                url: url,
                tags: [tag]
            }

            console.log(body);

            axios.post(`${api}/topics`, body, { headers: { "Access-Control-Allow-Origin": "*" } })
                .then(() => {
                    setSuccessSnack(true);
                })
                .catch(error => {
                    if (error.response.status && error.response.status === 400) {
                        setErrSnack(true);
                    } else {
                        setWarnSnack(true);
                    }
                });
        } else {
            setInfoSnack(true);
        }
    }


    return (
        <Modal
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            open={open}
            onClose={() => {
                setOpen(false);
                handleCloseAlert();
            }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className={classes.paper}>
                <h1 id="simple-modal-title">Share your knowledge with us!</h1>
                <p id="simple-modal-description">
                    We want to create a hub where developers can easily find what they're looking for.
                </p>
                <Input placeholder={'Title (ex: Lambdas in Java)'}
                    autoFocus={true}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Input placeholder={'URL (ex: www.pane.la)'}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <div style={{ margin: '10px 0px 10px 0px' }}>
                    <FormControl>
                        <InputLabel shrink>
                            Tag
                        </InputLabel>

                        <NativeSelect onChange={(e) => setTag({ id: e.target.value })}>
                            <option defaultValue="">
                                empty (not allowed)
                            </option>
                            {tags.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </NativeSelect>
                    </FormControl>
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

                <Snackbar open={successSnack} autoHideDuration={5000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="success">
                        Thank you for suggesting. We're going to review your submission soon.
                    </Alert>
                </Snackbar>
                <Snackbar open={errSnack} autoHideDuration={5000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="error">
                        We couldn't accept your suggestion. Sorry, try it later.
                    </Alert>
                </Snackbar>
                <Snackbar open={warnSnack} autoHideDuration={5000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="warning">
                        Oops! We didn't expect this to happen.
                    </Alert>
                </Snackbar>
                <Snackbar open={infoSnack} autoHideDuration={5000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="info">
                        There are missing fields in your submission!
                    </Alert>
                </Snackbar>
            </div>
        </Modal>
    );
}
