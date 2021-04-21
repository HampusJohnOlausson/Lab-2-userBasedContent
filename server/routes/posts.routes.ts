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
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
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

    const id = req.params.id;

    Tweet.findByIdAndDelete(id)
      .then((result) => {
        res.status(202).json(result)
      }).catch((err) => {
        console.log(err);
      })

})

router.put('/:id', (req, res) => {
  
   const id = req.params.id;

  // Tweet.findByIdAndUpdate(id)
  //   .then((result) => {
  //     res.status(202).json(result);
  //   }).catch((err) => {
  //     console.log(err);
  //   })
})


export default router;