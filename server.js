const express = require('express');

const server = express();

const projectsRouter = require('./routes/projectsRouter');
const actionsRouter = require('./routes/actionsRoutes');

server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Hello!</h2>`)
  });

module.exports = server;