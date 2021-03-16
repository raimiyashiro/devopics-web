import React, { useState, useEffect } from 'react';
import Topics from './Topics';

import { Button } from '@material-ui/core'

import axios from 'axios';

export default function Tags() {

    const url = `${process.env.REACT_APP_DEV_API}/tags`;

    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState(null);

    const fetchTags = async () => {
        const response = await axios.get(url, { params: { havingTopics: true }, headers: { "Access-Control-Allow-Origin": "*" } });
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
                {tags.map(t => <Button key={t.id}
                    onClick={() => setTag({ name: t.name, color: t.color })}
                    style={{ color: t.text, backgroundColor: t.color, margin: '4px', minWidth: '64px' }}>
                    {t.name}
                </Button>)}

                <Button onClick={() => setTag(null)}
                    style={{ color: '#fff', backgroundColor: '#e74c3c', margin: '4px', minWidth: '64px' }}>
                    {'SEE ALL'}
                </Button>
            </ul>

            <Topics tag={tag} />
        </div>
    );
}
