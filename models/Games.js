import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 300
    },
    username: {
        type: String,
        required: true

    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }

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
    comments: [CommentSchema],
    defautlt: []

}, { timestamps: true });

const Game = mongoose.model('game', gameschema);


export default Game;