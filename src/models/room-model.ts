import mongoose from 'mongoose';

// Define Room model
const Room = mongoose.model('Room', new mongoose.Schema({
    name: String,
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomType',
    },
    price: Number,
}));

export default Room;