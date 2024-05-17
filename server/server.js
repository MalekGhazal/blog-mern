import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/db.js';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import User from './models/UserModel.js';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

app.use(bodyParser.json());

// GET All Users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET User by ID
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// CREATE New User
app.post('/user', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Bad request.' });
  }
});

// UPDATE User by ID
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {
      username: req.body.username,
      email: req.body.email,
    };

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(req.body.password, salt);
    }

    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE User by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
});

app.listen(port, () => {
  console.log(chalk.blue(`Server is running on port: ${port}`));
});
