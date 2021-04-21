import express from 'express'
import { readBuilderProgram } from 'typescript';
const router = express.Router()
import Tweet from '../models/tweet.js';


router.get('/tweets', ( req, res) => {
    Tweet.find().sort({ createdAt: -1 })
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
      console.log(err);
    })
})


router.get("/tweets/:id", (req, res) => {
    const id = req.params.id;
    Tweet.findById(id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        console.log(err);
      })
    
});

router.post("/tweets/", (req, res) => {

  const tweet = new Tweet(req.body);
  tweet.save()

})

router.delete('/tweets/:id', (req, res) => {

    // const tweetId = req.params.id;
    // tweets = tweets.filter((tweet) => tweet.id !== parseInt(tweetId));

    // if(!tweetId){
    //     return res.status(404).send('couldnt find the tweet');
    // }

    // res.send('The tweet was deleted');
})

router.put('/tweets/:id', (req, res) => {
    // const tweetId = req.params.id;
    // const tweet = tweets.find((t) => t.id === parseInt(tweetId));

    // if(!tweet){
    //     return res.status(404).send('The tweet was not found!');
    // }

    // tweet.tweet = req.body.tweet;

    // res.status(200).send('the tweet has been updated!');

    // res.send(tweet);
})


export default router;