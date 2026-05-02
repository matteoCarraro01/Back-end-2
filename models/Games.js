import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 300
    },
    author: String,

},
    {
        timestamps: true
    }
);






const gameschema = new mongoose.Schema({
    title: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    },
    image: { type: String },
    description: { type: String },
    genre: { type: String },
}, { timestamps: true });

const Game = mongoose.model('Game', gameschema);


export default Game;