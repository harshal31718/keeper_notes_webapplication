import React, { useState, useEffect } from "react";
import Axios from "axios";
import Header from "./components/Header";
import Note from "./components/Note";
import Footer from "./components/Footer";
import ElementCreater from "./components/ElementCreater";

const App = () => {
  const [count, setCount] = useState(0);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // make the API call to get notes from database
    Axios.get("http://localhost:4000/getData")
      .then((result) => {
        setNotes(result.data);
        setCount(result.data[result.data.length - 1].id + 1);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  function addNote(newNote) {
    setCount(count + 1);
    Axios.post("http://localhost:4000/add", { newNote })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteNote(id) {
    Axios.post("http://localhost:4000/delete", { id: id })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Header />
      <ElementCreater count={count} addNote={addNote} />
      {notes.map((note, index) => (
        <Note
          key={note.key}
          id={note.id}
          title={note.title}
          content={note.content}
          deleteNote={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
};

export default App;
