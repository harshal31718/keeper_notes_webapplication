import React, { useState } from "react";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const ElementCreater = (props) => {
  const [newNote, setNewNote] = useState({
    key:props.count,
    id:props.count,
    title: "",
    content: "",
  });

  const [expansion, setExpansion] = useState({
    noOfRows: "1",
    zoomValue: false,
    inputType: "hidden",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewNote((prevValues) => {
      return {
        ...prevValues,
        key:props.count,
        id:props.count,
        [name]: value,
      };
    });
  }

  function expandArea() {
    setExpansion({
      noOfRows: "3",
      zoomValue: true,
      inputType: "text",
    })
  }

  return (
    <div>
      <form
        className="create-note"
        onSubmit={(event) => {
          props.addNote(newNote);
          setNewNote({ title: "", content: "" });

          event.preventDefault();
        }}
      >
        <input
          type={expansion.inputType}
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={newNote.title}
        ></input>

        <textarea
          type="text"
          onClick={expandArea}
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          value={newNote.content}
          rows={expansion.noOfRows}
        />
        <Zoom in={expansion.zoomValue}>
          <Fab type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
};

export default ElementCreater;
