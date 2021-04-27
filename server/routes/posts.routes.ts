import express from 'express'
import { readBuilderProgram } from 'typescript';
const router = express.Router()
import Tweet from '../models/tweet.model';
import mongoose from 'mongoose'


router.get('/', ( req, res) => {
    Tweet.find().sort({ createdAt: -1 })
    .then((result: any) => {
        res.status(200).json(result)
    })
    .catch((err: any) => {
      console.log(err);
    })
})

router.get("/user/tweets", (req: any, res) => {
    Tweet.find({ name: req.session.username }).sort({ createdAt: -1 })
    .then((result: any) => {
        res.status(200).json(result);
    })
    .catch((err: any) => {
      console.log(err);
    })
});


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

router.post("/", async (req, res) => {

  if(req.session) {
    if(!req.session.username) {
      return res.status(400).json('You need to sign in to post a tweet')
    }
    const tweet = new Tweet(
      {
        tweet: req.body.tweet, 
        name: req.session.username
      }
      );
      await tweet.save()
      res.status(201).json(tweet)
  }
})

router.delete('/:id', async (req, res) => {

    const id = req.params.id;
    const currentTweet = await Tweet.findById(id)
    
  
    if(req.session && currentTweet) {
      if(currentTweet.name !== req.session.username && req.session.role !== 'admin'){
        return res.status(401).json('You didnt post this tweet so you cant delete it')
      }
    }

    Tweet.findByIdAndDelete(id)
      .then((result: any) => {
        res.status(202).json(result)
      }).catch((err: any) => {
        console.log(err);
      })

})

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const currentTweet = await Tweet.findById(id)
  if(req.session && currentTweet) {
    if(currentTweet.name !== req.session.username && req.session.role !== 'admin'){
      return res.status(401).json('You didnt post this tweet so you cant change it')
    }
  }

  console.log(req.body.tweet)

  Tweet.findByIdAndUpdate(id, { tweet: req.body.tweet })
    .then((result) => {
      res.status(202).json(null);
    }).catch((err) => {
      console.log(err);
    })


});

export default router;