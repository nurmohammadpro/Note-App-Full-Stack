import { useState } from "react";

const Dashboard = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableNote, setEditableNote] = useState(null);

  const titleHandler = (e) => {
    setNoteTitle(e.target.value);
  };

  const contentHandler = (e) => {
    setNoteContent(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (noteTitle === "" || noteContent === "") {
      alert("Please fill in all fields");
      return;
    }
    if (editMode) {
      const updatedNotes = notes.map((note) => {
        if (note.id === editableNote.id) {
          return {
            ...note,
            title: noteTitle,
            content: noteContent,
          };
        }
        return note;
      });
      setNotes(updatedNotes);
      setEditMode(false);
      setEditableNote(null);
    } else {
      const newNote = {
        id: notes.length + 1,
        title: noteTitle,
        content: noteContent,
      };
      setNotes([...notes, newNote]);
    }
    setNoteTitle("");
    setNoteContent("");
  };

  const removeHandler = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const editHandler = (note) => {
    setEditMode(true);
    setEditableNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
  };

  return (
    <div className="flex flex-col mt-20 w-full max-w-[1280px] mx-auto h-screen items-center">
      <div className="w-full mb-8 text-center">
        <h1 className="text-4xl font-bold">Notes App</h1>
      </div>
      <form onSubmit={submitHandler} className="w-full">
        <div
          className=" flex flex-col gap-2
        "
        >
          <input
            type="text"
            value={noteTitle}
            onChange={titleHandler}
            placeholder="Write your note heading"
            className="bg-gray-50 p-2 mb-2 rounded-md border border-gray-100 focus:ring-1 focus:ring-gray-300 focus:outline-none"
          />
          <textarea
            value={noteContent}
            onChange={contentHandler}
            placeholder="Write your note content"
            className="bg-gray-50 p-2 mb-2 rounded-md border border-gray-100 focus:ring-1 focus:ring-gray-300 focus:outline-none"
          ></textarea>
        </div>
        <button className="px-4 py-2 my-4 bg-gray-800 text-white rounded-md">
          {editMode ? "Update" : "Add Note"}
        </button>
      </form>
      <div className="mt-4 w-full">
        <ul>
          {notes.map((note) => (
            <div
              key={note.id}
              className="grid grid-cols-3 items-center justify-around bg-gray-50 border border-gray-400 rounded-md mb-4 p-4"
            >
              <div>
                <h1 className="font-semibold">{note.title}</h1>
              </div>
              <div>
                <p className="text-gray-600">{note.content}</p>
              </div>
              <div className="flex items-center justify-end gap-4">
                <div>
                  <button
                    className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={() => editHandler(note)}
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <button
                    className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={() => removeHandler(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
