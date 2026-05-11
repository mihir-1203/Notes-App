import Note from "../model/note.model.js"


export const createNote = async(req,res) => {
    const {title, description} = req.body;
    try {
        if(!title || !description){
            return res.status(400).json({message: "All fields required"})
        }
        const newNote = new Note({title:  title, description: description, createdBy: req.user._id})
        await newNote.save()
        res.status(200).json(newNote)

    } catch (error) {
        res.status(400).json({message: error.message})
        
    }

}
export const fetchAllNotes = async(req,res) => {
    try {
        const allNotes = await Note.find({createdBy: req.user._id})             // from req.user = await User.findById(decoded.id).select("-password")
        res.status(200).json(allNotes)
    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
}

export const fetchNote = async(req,res) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).json({message: "Note not found"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
        
    }
}

export const updateNote = async(req,res) => {
    const {title, description} = req.body;
    
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, {title, description}, {new:true})
        res.status(200).json({note})
    } catch (error) {
        return res.status(500).json({message: error.message})
    } 
}
export const deleteNote = async(req,res) => {
    try {
        await Note.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Note deleted successfully"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}