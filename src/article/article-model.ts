import mongoose from 'mongoose';
const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    user: String,
    title: String,
    // author: String,
    // body: String,
    // comments: [{ body: String, date: Date }],
    // date: { type: Date, default: Date.now },
    // hidden: Boolean,
    // meta: {
    //   votes: Number,
    //   favs: Number
    // }
  },
  { strict: false },
);

const articleModel = mongoose.model('Article', articleSchema);
export default articleModel;
