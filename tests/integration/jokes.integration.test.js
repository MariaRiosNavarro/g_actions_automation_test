import supertest from "supertest";
import { app } from "../../src/app.js";
import { JokeModel } from "../../src/jokes/jokes.model.js";
import { jest } from "@jest/globals";

const request = supertest(app);

// --------------------------------------GET ALL
describe('Check the Route "/" Get', () => {
  test("I expect a code 200 when I use the route Get properly", async () => {
    const response = await request.get("/api/jokes");
    expect(response.statusCode).toBe(200);
  });

  test("I expect an array of data when I use the ruote Get", async () => {
    const response = await request.get("/api/jokes");
    expect(response.body.success).toBe(true);
    expect(response.body.message).toContain("Jokes successfully retrieved 🤣");
    expect(response.body.data).toBeDefined();
  });

  test("I expect a code 500 if I use the Get route incorrectly", async () => {
    // Mock find function to throw an exception
    jest.spyOn(JokeModel, "find").mockImplementationOnce(() => {
      throw new Error("Simulated error");
    });
    const response = await request.get("/api/jokes");
    expect(response.statusCode).toBe(500);
    // Restore the original implementation of the find function
    jest.spyOn(JokeModel, "find").mockRestore();
  });
});
// --------------------------------------GET_ONE
describe('Check the Route "/:id" GetOne', () => {
  test("I expect a code 200 and valid data when I use the route GetOne properly", async () => {
    // Assuming a joke ID available for testing
    const jokeId = "placeholder-mock-valid-joke-id";

    // Mock the findOne function to return a valid joke
    jest.spyOn(JokeModel, "findOne").mockResolvedValueOnce({
      _id: jokeId,
    });

    const response = await request.get(`/api/jokes/${jokeId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toContain(jokeId);
    expect(response.body.data).toBeDefined();

    // Restore the original implementation of the findOne function
    jest.spyOn(JokeModel, "findOne").mockRestore();
  });

  test("I expect a code 404 if the joke is not found", async () => {
    // Assuming an invalid joke ID for testing
    const invalidJokeId = "placeholder-mock-invalid-joke-id";

    // Mock the findOne function to return null (joke not found)
    jest.spyOn(JokeModel, "findOne").mockResolvedValueOnce(null);

    const response = await request.get(`/api/jokes/${invalidJokeId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("joke not found");

    // Restore the original implementation of the findOne function
    jest.spyOn(JokeModel, "findOne").mockRestore();
  });

  test("I expect a code 500 if there is an error during the retrieval process", async () => {
    // Assuming a joke ID available for testing
    const jokeId = "placeholder-mock-valid-joke-id";

    // Mock the findOne function to throw an exception
    jest.spyOn(JokeModel, "findOne").mockImplementationOnce(() => {
      throw new Error("Simulated error");
    });

    const response = await request.get(`/api/jokes/${jokeId}`);

    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Error retrieving one joke ❌");

    // Restore the original implementation of the findOne function
    jest.spyOn(JokeModel, "findOne").mockRestore();
  });
});
// --------------------------------------POST
describe('Check the Route "/" POST', () => {
  test("I expect a code 201 when I use the route Post properly", async () => {
    const response = await request.post("/api/jokes");
    expect(response.statusCode).toBe(201);
  });

  test("I expect an object as response when I use the Ruote post", async () => {
    const response = await request.post("/api/jokes");
    expect(response.body).toBeInstanceOf(Object);
  });

  test("I expect a code 500 if I use the post route incorrectly", async () => {
    // Mock find function to throw an exception
    jest.spyOn(JokeModel.prototype, "save").mockImplementationOnce(() => {
      // USE JokeModel.prototyp for "save" in POST
      throw new Error("Simulated error");
    });
    const response = await request.post("/api/jokes").send({
      text: "Why did the chicken cross the road?",
      category: "philosophy",
      language: "german",
    });
    expect(response.statusCode).toBe(500);
    // Restore the original implementation of the save function
    jest.spyOn(JokeModel.prototype, "save").mockRestore();
  });
});
// --------------------------------------DELETE
describe('Check the Route "/api/jokes/:id" Delete', () => {
  test("I expect a code 204 when I use the route Delete properly", async () => {
    // Assuming a joke ID available for testing
    const jokeId = "placeholder-mock-valid-joke-id";

    // Mock the findOneAndDelete function to simulate successful deletion
    jest.spyOn(JokeModel, "findOneAndDelete").mockResolvedValueOnce();

    const response = await request.delete(`/api/jokes/${jokeId}`);

    expect(response.statusCode).toBe(204);

    // Restore the original implementation of the findOneAndDelete function
    jest.spyOn(JokeModel, "findOneAndDelete").mockRestore();
  });

  test("I expect a code 500 if there is an error during the deletion process", async () => {
    // Assuming a joke ID available for testing
    const jokeId = "placeholder-mock-valid-joke-id";

    // Mock the findOneAndDelete function to throw an exception
    jest.spyOn(JokeModel, "findOneAndDelete").mockImplementationOnce(() => {
      throw new Error("Simulated error");
    });

    const response = await request.delete(`/api/jokes/${jokeId}`);

    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Error removing one joke❌");

    // Restore the original implementation of the findOneAndDelete function
    jest.spyOn(JokeModel, "findOneAndDelete").mockRestore();
  });

  test("I expect a code 500 if the joke ID is not valid", async () => {
    // Assuming an invalid joke ID for testing
    const invalidJokeId = "invalid-joke-id";

    const response = await request.delete(`/api/jokes/${invalidJokeId}`);

    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Error removing one joke❌");
  });
});

// --------------------------------------PUT
