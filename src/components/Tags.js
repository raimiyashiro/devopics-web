import React, { useState, useEffect } from 'react';

import { Button } from '@material-ui/core'

import axios from 'axios';

export default function Tags() {

    const test = '#000'

    const url = 'http://localhost:8080/tags';

    const [tags, setTags] = useState([]);

    const fetchData = async () => {
        const response = await axios.get(url);
        setTags(response.data);

    }

    useEffect(() => {
        fetchData()
        console.log(tags)
    }, []);


    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {tags.map(tag => <Button key={tag.id}
                    style={{
                        backgroundColor: tag.color,
                        color: tag.text,
                        margin: '4px',
                        minWidth: '64px'
                    }}>
                    {tag.name}
                </Button>)}
            </ul>
        </div>
    );
}
