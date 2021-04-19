import express from 'express'
import { readBuilderProgram } from 'typescript';
const router = express.Router()

let tweets = [
  {
    id: 1,
    tweet: " tweet 1",
  },
  {
    id: 2,
    tweet: " tweet 2",
  },
];

router.get('/tweets', ( req, res) => {
    if(!tweets){
        return res.status(404).send('Sorry Couldnt fins the tweets');
    }
    res.send(tweets);
})


router.get("/tweets/:id", (req, res) => {
    const tweetId = req.params.id;
    const tweet = tweets.find(t => t.id === parseInt(tweetId));

    if(!tweet){
        return res.status(404).send('Sorry, the tweet was not found!');
    }
    res.send(tweet);
});

router.post("/tweets/", (req, res) => {

    if(!req.body.tweet){
        return res.status(400).send('You need to tweet something!')
    }
    
     let newId = 0;
     tweets.forEach((tweet) => {
       if (tweet.id > newId) {
         newId = tweet.id;
       }
     });
     newId++;

     const tweet = req.body;

     const newTweet = {
       id: newId,
       tweet: tweet,
     };

     tweets.push(newTweet);

     res.status(201).send(newTweet.tweet);
})

router.delete('/tweets/:id', (req, res) => {

    const tweetId = req.params.id;
    tweets = tweets.filter((tweet) => tweet.id !== parseInt(tweetId));

    if(!tweetId){
        return res.status(404).send('couldnt find the tweet');
    }

    res.send('The tweet was deleted');
})

router.put('/tweets/:id', (req, res) => {
    const tweetId = req.params.id;
    const tweet = tweets.find((t) => t.id === parseInt(tweetId));

    if(!tweet){
        return res.status(404).send('The tweet was not found!');
    }

    tweet.tweet = req.body.tweet;

    res.status(200).send('the tweet has been updated!');

    res.send(tweet);
})


export default router;