import React, { useState } from 'react';
import './App.css';


const CheckBox = (props) => {
  const { checked, onChange } = props;

  return (
    <div 
      style={{
        width: "20px",
        height: "20px",
        border: "1px solid black",
        cursor: "pointer",
        textAlign: "center",
        display: "inline-block"
      }}
      onClick={onChange}
    >
      {(checked) ? "X" : " "}
    </div>
  )
}

const Item = (props) => {
  const { item, onToggle, onRemove, index } = props;

  return (
    <li>
      <CheckBox onChange={() => onToggle(index)} checked={item.completed} />
      <span>{item.task}</span>
      <button onClick={() => onRemove(index)}>X</button>
    </li>
  )
}

const Input = (props) => {
  const { onSubmit, handleChange, value } = props;

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Enter a task..." onChange={handleChange} value={value} />
    </form>
  );
}

const List = () => {
  const [task, setTask] = useState("");
  const [items, setItems] = useState([]);

  const handleChange = (event) => {
    setTask(event.target.value);
  }

  const addItem = (e) => {
    e.preventDefault();

    setItems([...items, {
      task,
      completed: false,
      id: items.length
    }]);
    setTask("");
  }

  const removeItem = (index) => {
    const newItems = items.filter((_, _index) => index !== _index)

    setItems(newItems);
  }

  const toggleCompleted = (index) => {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed
    setItems(newItems);
  }

  const unfinishedTasks = items.filter((item) => item.completed === false);
  const finishedTasks = items.filter((item) => item.completed === true);

  return (
    <div>
      <Input 
        handleChange={handleChange}
        onSubmit={addItem}
        value={task}
      />
      <h3>Unfinished:</h3>
      <ul>
        {unfinishedTasks.map((item, index) => (
          <Item
            item={item}
            onToggle={toggleCompleted}
            onRemove={removeItem}
            index={item.id}
            key={item.id}
          />
        ))}
      </ul>
      <h3>Finished:</h3>
      <ul>
        {finishedTasks.map((item, index) => (
          <Item
            item={item}
            onToggle={toggleCompleted}
            onRemove={removeItem}
            index={item.id}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <List />
    </div>
  );
}

export default App;
