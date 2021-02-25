import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Topics({ tag }) {

  const url = `${process.env.REACT_APP_DEV_API}/topics`;

  const defaultTitle = 'All topics'

  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState(defaultTitle);

  const fetchData = async () => {
    const response = await axios.get(
      tag === null ? url : url + `?tags=${tag}`
    );
    setTopics(response.data);

  }

  useEffect(() => {
    fetchData().then(() => {
      if (tag) {
        setTitle(tag);
      }
      else {
        setTitle(defaultTitle);
      }
    });

  }, [tag]);


  return (
    <>
      <h1>{title}</h1>
      <ul>
        {topics.map(topic => <li key={topic.id}><a target="_blank" href={topic.url}>{topic.title}</a></li>)}
      </ul>
    </>
  );
}
