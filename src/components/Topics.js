import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Topics({ tag }) {

  const url = 'http://localhost:8080/topics';

  const [topics, setTopics] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      tag === null ? url : url + `?tags=${tag}`
    );
    setTopics(response.data);

  }

  useEffect(() => {
    fetchData()
    console.log(topics)
  }, [tag]);


  return (
    <div>
      <h1>{tag === null ? 'All topics' : tag}</h1>
      <ul>
        {topics.map(topic => <li key={topic.id}><a target="_blank" href={topic.url}>{topic.title}</a></li>)}
      </ul>
    </div>
  );
}
