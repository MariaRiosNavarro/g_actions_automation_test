import express from "express";
import {
  getJokes,
  getOneJoke,
  postJoke,
  deleteJoke,
  putJoke,
} from "./horses.controller.js";

export const router = new express.Router();

router.get("/", getJokes);
router.post("/", postJoke);
router.get("/:id", getOneJoke);
router.put("/:id", putJoke);
router.delete("/:id", deleteJoke);
