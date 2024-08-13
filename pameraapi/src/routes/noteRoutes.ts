import { Router } from 'express';
import { getNotes, createNote, updateNote, deleteNote, getNoteById } from '../controllers/NoteController';

const router = Router();

router.get('/notes', getNotes);
router.post('/notes', createNote);
router.put('/notes/:id', updateNote);  // Ensure this is correctly defined
router.delete('/notes/:id', deleteNote);
router.get('/notes/:id', getNoteById);

export default router;

