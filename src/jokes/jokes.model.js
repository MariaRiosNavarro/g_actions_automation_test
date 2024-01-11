import mongoose from "mongoose";

const jokeSchema = new mongoose.Schema({
  text: String,
  category: String,
  language: String,
});

export const JokeModel = mongoose.model("Joke", jokeSchema);
