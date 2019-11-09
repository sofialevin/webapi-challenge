const express = require('express');

const router = express.Router();

const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(
            {
                success: true,
                actions: actions
            }
        )
    })
    .catch(() => res.status(500).json(
        {
            success: false,
            error: "The actions information could not be retrieved."
        }
    ))
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const action = await Actions.get(id);
        if (!action) {
            res.status(404).json(
                {
                    success: false,
                    message: "The action with the specified ID does not exist."
                }
            )
        } else {
            res.status(200).json(
                {
                    success: true,
                    action: action
                }
            )
        }
    }
    catch (err) {
        res.status(500).json(
            {   
                success: false,
                error: "The action information could not be retrieved."
            }
        )
    }
})

router.post('/', validateProjectId, (req, res) => {
    const action = req.body;

    if (!action.description || !action.notes) {
        res.status(400).json(
            {
                success: false,
                errorMessage: "Please provide notes and description for the action."
            }
        )
    } else {
        Actions.insert(action)
        .then(newAction => 
            res.status(201).json(
                {
                    success: true,
                    action: newAction
                }
            )
        )
        .catch(() => res.status(500).json(
            {
                success: false,
                error: "There was an error while saving the action to the database"
            }
        )
    )}
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedAction = await Actions.remove(id);
        if (!deletedAction) {
            res.status(404).json(
                {
                    success: false,
                    message: "The action with the specified ID does not exist."
                }
            )
        } else {
            res.status(204).end();
        }
    }
    catch (err) { 
        res.status(500).json(
            {
                success: false,
                error: "The action could not be removed."
            }
        )
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const actionData = req.body;
    try {
        const action = await Actions.update(id, actionData)
        if (!action) {
            res.status(404).json(
                {
                    success: false,
                    message: "The action with the specified ID does not exist."
                }
            )
        } else  {
            Actions.get(id)
            .then(updatedAction => {
                res.status(200).json(
                    {
                        success: true,
                        project: updatedAction
                    }
                )
            }) 
        }
    }
    catch (err) { 
        res.status(500).json(
            {
                success: false,
                error: "The action information could not be modified."
            }
        )
    }
})

function validateProjectId(req, res, next) {
    const id = req.body.project_id;

    if (!id) {
        res.status(400).json(
            {
                message: "Please provide a project_id for the action."
            }
        )
    } else {
        Projects.get(id)
        .then(project => {
            if (project) {
                req.project = project
                next();
            } else {
                res.status(400).json(
                    {
                        message: "The project with the specified ID does not exist."
                    }
                )
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(
                {
                    message: 'exception', err
                }
            )
        })
    }
        
};

module.exports = router;