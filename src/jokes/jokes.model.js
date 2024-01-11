import mongoose from "mongoose";

const jokeSchema = new mongoose.Schema({
  text: String,
  category: Array,
  language: String,
});

export const Joke = mongoose.model("Joke", jokeSchema);
