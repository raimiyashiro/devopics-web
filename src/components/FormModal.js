import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, InputLabel, NativeSelect } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

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
            setDisplay(!display)
        };
    }, [event]);

    const api = `${process.env.REACT_APP_DEV_API}/tags`;
    const [tags, setTags] = useState([]);

    const fetchTags = async () => {
        const response = await axios.get(api);
        setTags(response.data);
        console.log(tags);
    }

    const [title, setTitle] = useState(null);
    const [url, setUrl] = useState(null);
    const [tag, setTag] = useState({})

    const handleSubmit = () => {
        console.log(title);
        console.log(url);
        console.log(tag);
    }


    useEffect(() => {
        fetchTags()
    }, []);

    return (
        <Modal
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            open={display}
            onClose={() => setDisplay(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className={classes.paper}>
                <h1 id="simple-modal-title">Share your knowledge with us!</h1>
                <p id="simple-modal-description">
                    Our aim is to create a hub where developers can find what they're looking for, just by a few clicks.
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
                >Submit
                </Button>
            </div>
        </Modal>
    );
}