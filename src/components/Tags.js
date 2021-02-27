import React, { useState, useEffect } from 'react';
import Topics from './Topics';

import { Button } from '@material-ui/core'

import axios from 'axios';

export default function Tags() {

    const url = `${process.env.REACT_APP_DEV_API}/tags`;

    const [tags, setTags] = useState([]);
    const [topic, setTopic] = useState(null);

    const fetchTags = async () => {
        const response = await axios.get(url, { params: { withTopics: true } });
        setTags(response.data);
    }

    useEffect(() => {
        fetchTags();
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
                    onClick={() => setTopic(tag.name)}
                    style={{ color: tag.text, backgroundColor: tag.color, margin: '4px', minWidth: '64px' }}>
                    {tag.name}
                </Button>)}

                <Button onClick={() => setTopic(null)}
                    style={{ color: '#fff', backgroundColor: '#e74c3c', margin: '4px', minWidth: '64px' }}>
                    {'SEE ALL'}
                </Button>
            </ul>

            <Topics tag={topic} />
        </div>
    );
}
