import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { createNote, deleteNote, fetchAllNotes, fetchNote, updateNote } from '../controllers/note.controller.js'

const router = express.Router()

router.post('/', protect, createNote)
router.get('/', protect, fetchAllNotes)
router.get('/:id', protect, fetchNote)
router.put('/:id', protect, updateNote)
router.delete('/:id', protect, deleteNote)


export default router