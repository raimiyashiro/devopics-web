import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function List() {

  const url = 'http://localhost:8080/topics';

  const [topics, setTopics] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(url);
    setTopics(response.data);

  }

  useEffect(() => {
    fetchData()
    console.log(topics)
  }, []);


  return (
    <div>
      <h1>All categories</h1>
      <ul>
        {topics.map(topic => <li key={topic.id}><a target="_blank" href={topic.url}>{topic.title}</a></li>)}
      </ul>
    </div>
  );
}
