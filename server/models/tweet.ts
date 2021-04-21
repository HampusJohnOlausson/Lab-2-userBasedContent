import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tweetSchema = new Schema({

    tweet: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;