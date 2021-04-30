import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;

interface UserTweet extends Document {
    name: string, 
    tweet: string
}

const tweetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tweet: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Tweet = mongoose.model<UserTweet>('Tweet', tweetSchema);
export default Tweet;
