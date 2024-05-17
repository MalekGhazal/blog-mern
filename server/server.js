import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/db.js';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import User from './models/UserModel.js';
dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

app.use(bodyParser.json());

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/user', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(chalk.blue(`Server is running on port: ${port}`));
});
