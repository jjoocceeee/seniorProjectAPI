import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import mongoose, { mongo } from 'mongoose';

const TweetSchema = new mongoose.Schema({
  tweet:{
    type:String,
    required: true,
    description: "Tweet",
    index:true
  },
  rating: {
    type: Number,
    description: "Sentiment Score for Tweet",
    required: true
  }, 
  date: {
    type: Date,
    required: true,
    description: "Date Tweet was published."
  },
  company: {
    type: String,
    required: true,
    description: "Company that the tweet is about."
  }
});


const Tweet = mongoose.model('Tweet', TweetSchema);

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {};
const TweetTC = composeWithMongoose(Tweet, customizationOptions);

TweetTC.addResolver({
  name:"RecentTweetsByTicker",  
  args: {
      ticker: "String!"
    },
    type: ["Tweet"],
    resolve: async ({args, source, context}) => {
      console.log("Args.ticker: ", args.ticker);
      let tweets = await Tweet.find({company: args.ticker}).sort({date: -1}).limit(10);
      return tweets;
    }
  })


export { TweetTC };