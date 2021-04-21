import express from 'express'
import { readBuilderProgram } from 'typescript';
const router = express.Router()
import Tweet from '../models/tweet.model';

router.get('/', ( req, res) => {
    Tweet.find().sort({ createdAt: -1 })
    .then((result: any) => {
        res.status(200).json(result)
    })
    .catch((err: any) => {
      console.log(err);
    })
})


router.get("/:id", (req, res) => {
    const id = req.params.id;
    Tweet.findById(id)
      .then((result: any) => {
        res.status(200).json(result)
      })
      .catch((err: any) => {
        console.log(err);
      })
    
});

router.post("/", (req, res) => {

  const tweet = new Tweet(req.body);
  tweet.save()
    .then((result) => {
      res.status(201).json(result);
    }).catch((err) => {
      console.log(err);
    })

})

router.delete('/:id', (req, res) => {

    // const tweetId = req.params.id;
    // tweets = tweets.filter((tweet) => tweet.id !== parseInt(tweetId));

    // if(!tweetId){
    //     return res.status(404).send('couldnt find the tweet');
    // }

    // res.send('The tweet was deleted');
})

router.put('/:id', (req, res) => {
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