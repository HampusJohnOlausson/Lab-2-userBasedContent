import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;

interface UserTweet extends Document {
    name: string, 
    tweet: string, 
    user: Schema.Types.ObjectId | Object
}

const tweetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'Users'
    },
    tweet: {
        type: String,
        required: true
    }, 
    date: {
        type: String, 
        required: true
    }
})

const Tweet = mongoose.model<UserTweet>('Tweet', tweetSchema);
export default Tweet;
