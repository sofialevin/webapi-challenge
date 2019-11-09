const express = require('express');

const router = express.Router();

const Projects = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(
            {
                success: true,
                projects: projects
            }
        )
    })
    .catch(() => res.status(500).json(
        {
            success: false,
            error: "The projects information could not be retrieved."
        }
    ))
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const project = await Projects.get(id);
        if (!project) {
            res.status(404).json(
                {
                    success: false,
                    message: "The project with the specified ID does not exist."
                }
            )
        } else {
            res.status(200).json(
                {
                    success: true,
                    project: project
                }
            )
        }
    }
    catch (err) {
        res.status(500).json(
            {   
                success: false,
                error: "The project information could not be retrieved."
            }
        )
    }
})

router.post('/', (req, res) => {
    const project = req.body;

    if (!project.name || !project.description) {
        res.status(400).json(
            {
                success: false,
                errorMessage: "Please provide name and description for the project."
            }
        )
    } else {
        Projects.insert(project)
        .then(newProject => 
            res.status(201).json(
                {
                    success: true,
                    project: newProject
                }
            )
        )
        .catch(() => res.status(500).json(
            {
                success: false,
                error: "There was an error while saving the project to the database"
            }
        )
    )}
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedProject = await Projects.remove(id);
        if (!deletedProject) {
            res.status(404).json(
                {
                    success: false,
                    message: "The project with the specified ID does not exist."
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
                error: "The project could not be removed."
            }
        )
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const projectData = req.body;
    try {
        const project = await Projects.update(id, projectData)
        if (!project) {
            res.status(404).json(
                {
                    success: false,
                    message: "The project with the specified ID does not exist."
                }
            )
        } else  {
            Projects.get(id)
            .then(updatedProject => {
                res.status(200).json(
                    {
                        success: true,
                        project: updatedProject
                    }
                )
            }) 
        }
    }
    catch (err) { 
        res.status(500).json(
            {
                success: false,
                error: "The project information could not be modified."
            }
        )
    }
})

router.get('/:id/actions', async (req, res) => {
    const id = req.params.id;

    try {
        const projectActions = await Projects.getProjectActions(id);
        console.log(projectActions)
        if (projectActions.length > 0) {
            res.status(200).json(
                {
                    success: true,
                    actions: projectActions
                }
            )
        } else {
            res.status(404).json(
                {
                    success: false,
                    message: "There are no actions for this project id"
                }
            )
        } 
    }
    catch (err) { 
        res.status(500).json(
            {
                success: false,
                error: "The actions information could not be retrieved."
            }
        )
    }
})

module.exports = router;