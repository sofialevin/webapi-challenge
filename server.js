const express = require('express');

const server = express();
const cors = require('cors');

const projectsRouter = require('./routes/projectsRouter.js');
const actionsRouter = require('./routes/actionsRouter.js');

server.use(express.json());
server.use(cors());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
  res.send('<h2>Hello from my API!</h2>');
});

module.exports = server;
