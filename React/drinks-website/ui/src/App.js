import React, { useEffect, useState } from 'react';
import client from "./api/client";
import './App.css';

const DrinkForm = (props) => {
  const initialState = {
    name: '',
    type: 'energy',
    price: '',
    calories: ''
  };
  const [formState, setFormState] = useState(initialState);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await client.post("/drinks", formState);

    if(props.onSubmit) props.onSubmit();
    setFormState(initialState);
  }

  return (
    <>
      <h3>Create Drink:</h3>
      <form onSubmit={handleSubmit} className="Form">
        <input 
          type="text"
          name="name"
          onChange={handleChange}
          value={formState.name}
          placeholder="Name..."
        />
        <div className="Form__options">        
          <label>Type:</label>
          <select 
            name="type" 
            onChange={handleChange} 
            value={formState.type}
          >
            <option value="energy">Energy</option>
            <option value="healthy">Healthy</option>
            <option value="alcoholic">Alcoholic</option>
          </select>
        </div>
        <input 
          type="text" 
          name="price"
          onChange={handleChange}
          value={formState.price}
          placeholder="Price..."
        />
        <input
          type="text"
          name="calories"
          onChange={handleChange}
          value={formState.calories}
          placeholder="Calories..."
        />
        <button>Add Drink</button>
      </form>
    </>
  )
}

const Drink = (props) => {
  const { drink } = props;

  const deleteDrink = async () => {
    const response = await client.delete(`/drinks/${drink._id}`);

    if(props.onDelete) props.onDelete(response.data);
  }

  return (
    <div className="Drink">
      <div>Name: {drink.name}</div>
      <div>Price: ${drink.price / 100}</div>
      <div>Calories: {drink.calories}</div>
      <button className="Drink__delete" onClick={deleteDrink}>X</button>
    </div>
  );
}

const DrinkList = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the drinks from our API and set state
  const getDrinks = async () => {
    const response = await client.get("/drinks");

    setDrinks(response.data);
    setLoading(false);
  }

  // When the component exists
  useEffect(() => {
    getDrinks();
  }, []);

  return (
    <>
      <DrinkForm onSubmit={getDrinks} />
      <div className="Drinks">
        {loading && (<em>Loading...</em>)}
        {drinks.map((drink) => (
          <Drink 
            key={drink._id} 
            drink={drink} 
            onDelete={getDrinks}
          />
        ))}
      </div>
    </>
  )
}

const App = () => {
  return (
    <div className="App">
      <DrinkList />
    </div>
  );
}

export default App;
