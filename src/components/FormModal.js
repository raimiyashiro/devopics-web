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
                if (!tag) { setTag(res.data[0]); }
            })
            .finally(() => {
                if (tag) {
                    console.log(`Current tag is: ${tag.name}`);
                }
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
        setSuccessSnack(false);
        setErrSnack(false);
        setWarnSnack(false);
        setInfoSnack(false);
    }

    const handleSubmit = () => {
        if (title && url && tag) {
            const body = {
                title: title,
                url: url,
                tags: [tag]
            }

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
                    <FormControl>
                        <InputLabel shrink>
                            Tag
                        </InputLabel>

                        <NativeSelect onChange={(e) => setTag({ id: e.target.value })}>
                            <option defaultValue="">
                                Choose
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
                        This is a success message!
                    </Alert>
                </Snackbar>
                <Snackbar open={errSnack} autoHideDuration={5000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="error">
                        This is an error message!
                    </Alert>
                </Snackbar>
                <Snackbar open={warnSnack} autoHideDuration={5000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="warning">
                        This is a warning message!
                    </Alert>
                </Snackbar>
                <Snackbar open={infoSnack} autoHideDuration={5000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="info">
                        This is an information message!
                    </Alert>
                </Snackbar>
            </div>
        </Modal>
    );
}
