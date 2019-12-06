const express = require('express');

const router = express.Router();

const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');

function validateProjectId(req, res, next) {
  const id = req.body.project_id;

  if (!id) {
    res.status(400).json({ message: 'Please provide a project_id for the action.' });
  } else {
    Projects.get(id)
      .then((project) => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(400).json({ message: 'The project with the specified ID does not exist.' });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error retrieving project from database', error: err });
      });
  }
}

router.get('/', (req, res) => {
  Actions.get()
    .then((actions) => res.status(200).json(actions))
    .catch((err) => res.status(500).json({ message: 'Error retrieving actions from database', error: err }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Actions.get(id)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: 'Invalid action id' });
      }
    })
    .catch((err) => res.status(500).json({ message: 'Error retrieving action from database', error: err }));
});

router.post('/', validateProjectId, (req, res) => {
  const { body } = req;

  if (body.description && body.notes) {
    Actions.insert(body)
      .then((action) => res.status(201).json(action))
      .catch((err) => res.status(500).json({ message: 'Error creating action in database', error: err }));
  } else {
    res.status(400).json({ message: 'Please provide a description and notes for the action.' });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Actions.remove(id)
    .then((action) => {
      if (action) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Invalid action id' });
      }
    })
    .catch((err) => res.status(500).json({ message: 'Error deleting action from database', error: err }));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;

  Actions.update(id, body)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: 'Invalid action id' });
      }
    })
    .catch((err) => res.status(500).json({ message: 'Error updating action in database', error: err }));
});

module.exports = router;
