import mongoose from 'mongoose';

// Define RoomType model
const RoomType = mongoose.model('RoomType', new mongoose.Schema({
    name: String,
}));

export default  RoomType;