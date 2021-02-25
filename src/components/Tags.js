import React, { useState, useEffect } from 'react';
import Topics from './Topics';

import { Button } from '@material-ui/core'

import axios from 'axios';

export default function Tags() {

    const url = `${process.env.REACT_APP_DEV_API}/tags`;

    const [tags, setTags] = useState([]);
    const [topics, setTopics] = useState(null);

    const fetchTags = async () => {
        const response = await axios.get(url, {
            auth: {
                username: process.env.REACT_APP_SECURITY_USERNAME,
                password: process.env.REACT_APP_SECURITY_PASSWORD,
            }
        });
        setTags(response.data);

    }

    useEffect(() => {
        fetchTags()
        console.log(tags)
    }, []);

    const buttonStyle = {
        margin: '4px',
        minWidth: '64px'
    }


    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {tags.map(tag => <Button key={tag.id}
                    onClick={() => setTopics(tag.name)}
                    style={{
                        color: tag.text,
                        backgroundColor: tag.color,
                        margin: '4px',
                        minWidth: '64px'
                    }}>
                    {tag.name}
                </Button>)}

                <Button onClick={() => setTopics(null)}
                    style={{
                        color: '#fff',
                        backgroundColor: '#e74c3c',
                        margin: '4px',
                        minWidth: '64px'
                    }}>
                    SEE ALL
                </Button>
            </ul>

            <Topics tag={topics} />

        </div>
    );
}
