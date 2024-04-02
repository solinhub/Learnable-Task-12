import { Request, Response } from 'express';
import RoomType from '../models/room-type-model';

// RoomType controller functions
export const createRoomType = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name }: { name: string } = req.body;
        const roomType = new RoomType({ name });
        await roomType.save();
        res.status(201).json(roomType);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
}

export const getAllRoomTypes = async (req: Request, res: Response): Promise<void> => {
    try {
        const roomTypes = await RoomType.find();
        res.json(roomTypes);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};