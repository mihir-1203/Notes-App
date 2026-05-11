import axios from "axios";
import { useEffect, useState } from "react";
import NoteModal from "./NoteModal";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { setError("No authentication token found. Please login"); return; }
      const { data } = await axios.get("http://localhost:3003/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(data);
    } catch (error) {
      setError("Failed to fetch notes");
    }
  };

  const handleEdit = (note) => {
    setEditNote(note);
    setIsModalOpen(true);
  };

  useEffect(() => { fetchNotes(); }, []);

  const handleSaveNote = (newNote) => {
    if (editNote) {
      setNotes(notes.map((n) => (n._id === newNote._id ? newNote : n)));
    } else {
      setNotes([...notes, newNote]);
    }
    setEditNote(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { setError("No authentication token found. Please login"); return; }
      await axios.delete(`http://localhost:3003/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      setError("Failed to delete note");
    }
  };

  return (
    <div className="min-h-screen bg-cream bg-lined">
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditNote(null); }}
        note={editNote}
        onSave={handleSaveNote}
      />

      <div className="max-w-[1160px]  mx-auto px-9 pt-12 pb-10">

        {/* Page header */}
        <div className="mb-9">
          <h1 className="font-serif text-[32px] font-semibold text-ink tracking-tight leading-tight">
            Your notes
          </h1>
          <p className="text-sm text-ink-faint font-light mt-1">
            {notes.length} {notes.length === 1 ? "note" : "notes"}
          </p>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

        {/* Notes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-2xl border border-gray-400 border-subtle px-7 pt-7 pb-[22px] flex flex-col gap-[10px] hover:-translate-y-[2px] hover:shadow-md transition-all duration-200"
            >
              {/* Title */}
              <h3 className="font-serif text-[18px] font-semibold text-ink leading-snug tracking-tight">
                {note.title}
              </h3>

              {/* Body */}
              <p className="text-sm text-ink-muted font-light leading-relaxed flex-1 line-clamp-3">
                {note.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-[14px] border-t border-subtle mt-[6px]">
                <span className="text-[11px] text-ink-faint tracking-wide">
                  {new Date(note.updatedAt).toLocaleString(undefined, {
                    month: "short", day: "numeric", year: "numeric",
                    hour: "numeric", minute: "2-digit",
                  })}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(note)}
                    className="px-[14px] py-[6px] text-xs font-medium bg-accent-light text-accent border border-accent/25 rounded-[7px] hover:bg-[#EEDBCE] hover:border-accent/40 transition-all duration-150 active:scale-95"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="px-[14px] py-[6px] text-xs font-medium bg-red-50 text-red-600 border border-red-200 rounded-[7px] hover:bg-red-100 hover:border-red-300 transition-all duration-150 active:scale-95"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-9 right-9 w-[54px] h-[54px] rounded-full bg-accent hover:bg-accent-hover text-white text-2xl flex items-center justify-center shadow-lg shadow-accent/35 hover:shadow-accent/45 hover:scale-105 transition-all duration-150 active:scale-95"
      >
        +
      </button>
    </div>
  );
};

export default Home;
