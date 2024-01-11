import { JokeModel } from "./jokes.model.js";

// --------------------------------------------------------------------GET ALL

export const getJokes = async (req, res) => {
  try {
    //Wait & recibe Data
    const jokes = await JokeModel.find();
    res
      .status(200)
      //Confirmation back & data to frontend
      .json({
        success: true,
        message: "Jokes successfully retrieved 🤣",
        data: jokes,
      });
  } catch (error) {
    // Handle errors
    console.error("Error retrieving all jokes -------🙁", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving all jokes ❌",
      error,
    });
  }
};

// --------------------------------------------------------------------GET ONE

export const getOneJoke = async (req, res) => {
  try {
    const { id } = req.params;
    //Wait & recibe Data
    const joke = await JokeModel.findOne({ _id: id });
    // No Response handling

    if (!joke) {
      return res.status(404).json({ message: "joke not found" });
    }
    //Confirmation back  & data to frontend
    res.status(200).json({
      success: true,
      message: `joke with id= ${id} sucessfully retrieved 🤣`,
      data: joke,
    });
  } catch (error) {
    // Handle errors
    console.error("Error retrieving one joke -------🙁", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving one joke ❌",
      error,
    });
  }
};

// --------------------------------------------------------------------ADD ONE

export const postJoke = async (req, res) => {
  try {
    const joke = new JokeModel(req.body);

    await joke.save();
    //Confirmation back
    res
      .status(201)
      .json({
        success: true,
        message: "joke successfully added 🤣",
        data: joke,
      })
      .end();

    // Error Handling
  } catch (error) {
    // Handle errors
    console.error("Error adding one joke -------🙁", error);
    res.status(500).json({
      success: false,
      message: "Error adding one joke ❌",
      error: error.message,
    });
  }
};

// --------------------------------------------------------------------DELETE ONE

export const deleteJoke = async (req, res) => {
  try {
    const { id } = req.params;
    await JokeModel.findOneAndDelete({ _id: id });
    //sucess true
    res.status(204).end();
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error removing one joke❌", error });
  }
};

// --------------------------------------------------------------------EDIT ONE

export const putJoke = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "joke ID is missing" });
    }
    const newjokeData = { ...req.body };
    // Update Data
    const updatejoke = await JokeModel.findByIdAndUpdate(id, newjokeData, {
      new: true,
    });
    //  Confirmation back
    res.status(201).json({
      success: true,
      message: `joke with id= ${id} successfully updated 🤣`,
      data: updatejoke,
    });
  } catch (error) {
    // Handle errors
    console.error("Error editing one joke -------🙁", error);
    res
      .status(500)
      .json({ success: false, message: "Error editing one joke ❌", error });
  }
};
