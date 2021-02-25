import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Topics({ tag }) {

  const url = `${process.env.REACT_APP_DEV_API}/topics`;

  const [topics, setTopics] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      tag === null ? url : url + `?tags=${tag}`, {
      auth: {
        username: process.env.REACT_APP_SECURITY_USERNAME,
        password: process.env.REACT_APP_SECURITY_PASSWORD,
      }
    }
    );
    setTopics(response.data);

  }

  useEffect(() => {
    fetchData()
    console.log(topics)
  }, [tag]);


  return (
    <>
      <h1>{tag === null ? 'All topics' : tag}</h1>
      <ul>
        {topics.map(topic => <li key={topic.id}><a target="_blank" href={topic.url}>{topic.title}</a></li>)}
      </ul>
    </>
  );
}
