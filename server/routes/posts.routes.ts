import express, { Request, Response} from 'express'
import { readBuilderProgram } from 'typescript';
const router = express.Router()
import Tweet from '../models/tweet.model';
import mongoose from 'mongoose'


router.get('/', ( req, res) => {
    Tweet.find().populate('user')
    .then((result: any) => {
        res.status(200).json(result)
    })
    .catch((err: any) => {
      console.log(err);
    })
})

router.get("/user/tweets", (req: Request, res: Response) => {
    Tweet.find({ name: req.session?.username })
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err: Error) => {
      res.status(500).json(err.message)
    })
});


router.get("/:id", (req, res) => {
    const id = req.params.id;
    Tweet.findById(id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err: Error) => {
        res.status(500).json(err.message)
      })
    
});

router.post("/", async (req, res) => {
  let today = new Date()
  const date = today.getDate().toString()
  const month = today.getMonth().toString()
  const year = today.getFullYear().toString()
  const tweetDate = date + '/' + month + '/' + year


  if(req.session) {
    if(!req.session.username) {
      return res.status(400).json('You need to sign in to post a tweet')
    }
    const tweet = new Tweet(
      {
        tweet: req.body.tweet, 
        name: req.session.username, 
        date: tweetDate
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
  let today = new Date()
  const date = today.getDate().toString()
  const month = today.getMonth().toString()
  const year = today.getFullYear().toString()
  const tweetDate = date + '/' + month + '/' + year

  const id = req.params.id;
  const currentTweet = await Tweet.findById(id)
  if(req.session && currentTweet) {
    if(currentTweet.name !== req.session.username && req.session.role !== 'admin'){
      return res.status(401).json('You didnt post this tweet so you cant change it')
    }
  }

  console.log(req.body.tweet)

  Tweet.findByIdAndUpdate(id, { tweet: req.body.tweet, date: tweetDate })
    .then((result) => {
      res.status(202).json(null);
    }).catch((err) => {
      console.log(err);
    })


});

export default router;