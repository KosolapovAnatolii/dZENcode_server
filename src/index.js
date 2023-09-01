require('dotenv').config();

const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors({
  origin: 'https://kosolapovanatolii.github.io', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.get('/', (req, res) => {
  res.send('Hello!')
});

const server = app.listen(PORT);

const io = socketIO(server, {
  cors: {
      origin: "https://kosolapovanatolii.github.io",
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
  }
});

let activeSessionsCount = 0;

io.on('connection', (socket) => {
  console.log('A new client connected.');
  activeSessionsCount++;
  io.emit('activeSessionsCount', activeSessionsCount);

  socket.on('disconnect', () => {
    activeSessionsCount--;
    io.emit('activeSessionsCount', activeSessionsCount);
  });
});
