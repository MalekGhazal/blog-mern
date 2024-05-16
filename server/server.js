import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.json({
    post: {
      title: 'Lorem Ipsum',
      author: 'Malek',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      likes: 43,
      shares: 21,
      comments: [
        {
          id: 1,
          user: 'James',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          id: 2,
          user: 'David',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          id: 3,
          user: 'Khalid',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          id: 4,
          user: 'Nour',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
