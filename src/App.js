import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // this code here... fires when app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, task: doc.data().task})))
    })
  }, []);

  const addTodo = (event) => {
    // this will fire off when we click the button
    event.preventDefault(); // I will stop the REFRESH
    db.collection('todos').add({
      task: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput(''); // clear up the input after hitting submit
  }

  return (
    <div className="App">
      <h1>Small Todo App 👍</h1>
      <form>
        {/* <input ></input> */}
        
        <FormControl>
          <InputLabel>✅ Write a Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>

        <Button type='submit' disabled={!input} onClick={addTodo} variant="contained" color="primary">Add Todo</Button>
      </form>
      

      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
