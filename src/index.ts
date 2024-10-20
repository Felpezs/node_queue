import "dotenv/config";
import express from "express";
import UserController from "./app/controllers/userController";

const app = express();

app.use(express.json());

app.post("/users", (req, res) => {
  void UserController.store(req, res);
});

app.listen(3000, () => {
  console.log("Server running on localhost:3000");
});
