/*import Room from '../models/room';

// Room controller functions
const createRoom = async (req, res) => {
    try {
        const { name, roomType, price } = req.body;
        const room = new Room({ name, roomType, price });
        await room.save();
        res.status(201).json(room);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllRooms = async (req, res) => {
    try {
        const { search, roomType, minPrice, maxPrice } = req.query;
        let query: any = {};
        if (search) query.name = new RegExp(search, 'i');
        if (roomType) query.roomType = roomType;
        if (minPrice !== undefined && maxPrice !== undefined) {
            query.price = { $gte: minPrice, $lte: maxPrice };
        } else if (maxPrice !== undefined) {
            query.price = { $lte: maxPrice };
        }
        const rooms = await Room.find(query);
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json(room);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json(room);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json({ message: 'Room deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default {
createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom}; */


import { Request, Response } from 'express';
import Room from '../models/room';

// Room controller functions
export const createRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, roomType, price }: { name: string; roomType: string; price: number } = req.body;
        const room = new Room({ name, roomType, price });
        await room.save();
        res.status(201).json(room);
    } catch (error: unknown) {
        const err = error as Error
        res.status(400).json({ error: err.message });
    }
};

export const getAllRooms = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search, roomType, minPrice, maxPrice } = req.query;
        let query: any = {};
        if (search) query.name = new RegExp(search.toString(), 'i');
        if (roomType) query.roomType = roomType.toString();
        if (minPrice !== undefined && maxPrice !== undefined) {
            query.price = { $gte: +minPrice, $lte: +maxPrice };
        } else if (maxPrice !== undefined) {
            query.price = { $lte: +maxPrice };
        }
        const rooms = await Room.find(query);
        res.json(rooms);
    } catch (error: unknown) {
        const err = error as Error
        res.status(500).json({ error: err.message });
    }
};

export const getRoomById = async (req: Request, res: Response): Promise<void> => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return; res.status(404).json({ message: 'Room not found' });
        res.json(room);
    } catch (error: unknown) {
        const err = error as Error
        res.status(500).json({ error: err.message });
    }
};

export const updateRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const room  = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!room) return; res.status(404).json({ message: 'Room not found' });
        res.json(room);
    } catch (error: unknown) {
        const err = error as Error
        res.status(500).json({ error: err.message });
    }
};

export const deleteRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) return; res.status(404).json({ message: 'Room not found' });
        res.json({ message: 'Room deleted successfully' });
    } catch (error: unknown) {
        const err = error as Error
        res.status(500).json({ error: err.message });
    }
};