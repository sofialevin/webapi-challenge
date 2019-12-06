const express = require('express');

const router = express.Router();

const Projects = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
  Projects.get()
    .then((projects) => res.status(200).json(projects))
    .catch((err) => res.status(500).json({ message: 'Error retrieving projects from database', error: err }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Projects.get(id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'Invalid project id' });
      }
    })
    .catch((err) => res.status(500).json({ message: 'Error retrieving project from database', error: err }));
});

router.post('/', (req, res) => {
  const { body } = req;

  if (body.name && body.description) {
    Projects.insert(body)
      .then((project) => res.status(201).json(project))
      .catch((err) => res.status(500).json({ message: 'Error creating project in database', error: err }));
  } else {
    res.status(400).json({ message: 'Please provide a name and description for the project.' });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;

  Projects.update(id, body)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'Invalid project id' });
      }
    })
    .catch((err) => res.status(500).json({ message: 'Error updating project in database', error: err }));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
    .then((project) => {
      if (project) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Invalid project id' });
      }
    })
    .catch((err) => res.status(500).json({ message: 'Error deleting project in database', error: err }));
});

router.get('/:id/actions', (req, res) => {
  const { id } = req.params;

  Projects.getProjectActions(id)
    .then((actions) => {
      if (actions.length > 0) {
        res.status(200).json(actions);
      } else {
        res.status(400).json({ message: 'There are no actions for this project id' });
      }
    })
    .catch((err) => res.status(500).json({ message: 'Error getting actions in database', error: err }));
});

module.exports = router;
