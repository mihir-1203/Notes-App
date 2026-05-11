import axios from "axios";
import { useEffect, useState } from "react";

const NoteModal = ({ isOpen, onClose, note, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(note ? note.title : "");
    setDescription(note ? note.description : "");
    setError("");
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) { setError("No authentication token found. Please log in"); return; }

      const payload = { title, description };
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (note) {
        const { data } = await axios.put(`/api/notes/${note._id}`, payload, config);
        onSave(data.note);
      } else {
        const { data } = await axios.post("/api/notes", payload, config);
        onSave(data);
      }
      setTitle(""); setDescription(""); setError("");
      onClose();
    } catch (err) {
      setError("Failed to save note");
    }
  };

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div className="fixed inset-0 bg-ink/20 backdrop-blur-[2px] flex items-center justify-center z-50 px-4">

      {/* Modal card */}
      <div className="bg-white w-full max-w-md rounded-[20px] border border-subtle shadow-lg px-10 py-10">

        {/* Eyebrow */}
        <p className="text-[11px] font-medium tracking-[1.5px] uppercase text-accent mb-2">
          {note ? "Editing" : "New note"}
        </p>

        {/* Title */}
        <h2 className="font-serif text-2xl font-semibold text-ink mb-7">
          {note ? "Edit note" : "Create a note"}
        </h2>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-[18px]">
          {/* Note title input */}
          <div>
            <label className="block text-[11px] font-medium tracking-[0.4px] uppercase text-ink-muted mb-[7px]">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your note a title"
              className="w-full px-4 py-3 bg-cream text-ink text-[15px] rounded-[10px] border-[1.5px] border-transparent placeholder-ink-faint outline-none focus:border-accent focus:bg-white transition-colors duration-150"
              required
            />
          </div>

          {/* Description textarea */}
          <div>
            <label className="block text-[11px] font-medium tracking-[0.4px] uppercase text-ink-muted mb-[7px]">
              Content
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your note here..."
              rows={4}
              className="w-full px-4 py-3 bg-cream text-ink text-[15px] rounded-[10px] border-[1.5px] border-transparent placeholder-ink-faint outline-none focus:border-accent focus:bg-white transition-colors duration-150 resize-none"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              className="flex-1 py-3 bg-accent hover:bg-accent-hover text-white text-[15px] font-medium rounded-[10px] transition-colors duration-150 active:scale-[0.985]"
            >
              {note ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => { setTitle(""); setDescription(""); setError(""); onClose(); }}
              className="px-6 py-3 text-[15px] text-ink-muted border border-subtle rounded-[10px] hover:border-ink/20 hover:text-ink transition-colors duration-150 active:scale-[0.985]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
