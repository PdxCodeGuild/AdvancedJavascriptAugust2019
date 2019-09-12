import React, { useState, useEffect } from 'react';
import axios from "axios";

import './App.css';

const Photo = ({data}) => {
  const [hovering, setHovering] = useState(false);

  const showingClass = (hovering) ? "show" : "hide"

  return (
    <div 
      className="photo" 
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <img src={data.thumbnailUrl} alt={data.title} />
      <div className={showingClass}>{data.title}</div>
    </div>
  )
}

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPhotos = async () => {
    setLoading(true);
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/photos");

    setPhotos(data.slice(0, 40));
    setLoading(false);
  }

  useEffect(() => {
    getPhotos()
  }, []);

  return (
    <div className="Photos">
      {loading && (<em>Loading...</em>)}
      {photos.map((photo) => (
        <Photo key={photo.id} data={photo} />
      ))}
    </div>
  )
}

const List = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  } 

  const handleSubmit = (event) => {
    event.preventDefault();

    if(text.length === 0) return;

    setItems([...items, text]);
    setText("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Add a thing!" 
          onChange={handleChange} 
          value={text} 
        />
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Photos />
    </div>
  );
}

export default App;
