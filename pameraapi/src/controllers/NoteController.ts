import { Request, Response } from 'express';
import { Note } from '../models/Note';
import { AppDataSource } from '../config/ormconfig';
import { ObjectId } from 'mongodb';
const noteRepository = AppDataSource.getMongoRepository(Note);

export const getNotes = async (req: Request, res: Response): Promise<Response> => {
    const notes = await noteRepository.find();
    return res.json(notes);
};

export const createNote = async (req: Request, res: Response): Promise<Response> => {
    const newNote = noteRepository.create({
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    const result = await noteRepository.save(newNote);
    return res.json(result);
};

export const updateNote = async (req: Request, res: Response): Promise<Response> => {
    try {
        const note = await noteRepository.findOneBy({ _id: new ObjectId(req.params.id) }); // Use `_id` to match MongoDB's ID field
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        noteRepository.merge(note, req.body, { updatedAt: new Date() });
        const result = await noteRepository.save(note);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error });
    }
};

export const deleteNote = async (req: Request, res: Response): Promise<Response> => {
    const result = await noteRepository.delete(req.params.id);
    if (result.affected === 0) {
        return res.status(404).json({ message: "Note not found" });
    }
    return res.json({ message: "Note deleted" });
};
export const getNoteById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const note = await noteRepository.findOneBy({ _id: new ObjectId(req.params.id) }); // Use `_id`
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.json(note);
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error });
    }
};