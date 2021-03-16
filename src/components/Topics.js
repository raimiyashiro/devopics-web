import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Topics({ tag }) {

  const url = `${process.env.REACT_APP_DEV_API}/topics`;

  const defaultTitle = 'All topics';

  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState(defaultTitle);
  const [color, setColor] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(tag === null ? url : url + `?tags=${tag.name}`);
    setTopics(response.data);
  }

  useEffect(() => {
    fetchData().then(() => {
      if (tag) {
        setTitle(tag.name);
        setColor(tag.color);
      }
      else {
        setTitle(defaultTitle);
      }
    });
  }, [tag]);


  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {topics.map(topic =>
          <li key={topic.id}>
            <h4>
              <a target="_blank" href={topic.url}
                style={{ color: color ? color : '#e74c3c' }}
              >
                {topic.title}
              </a>
            </h4>
          </li>)}
      </ul>
    </div>
  );
}
