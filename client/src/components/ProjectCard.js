import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Icon } from 'semantic-ui-react';

const ProjectCard = ({project}) => {
  const [ actions, setActions ] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:4000/api/projects/${project.id}/actions`)
        .then(res => {
          console.log(res)
          setActions(res.data)
        })
        .catch(err => console.log(err))
  }, [])

  return (
    <Card>
    <Card.Content>
      <Card.Header>{project.name}</Card.Header>
      <Card.Meta>
        Completed: {
          project.completed ? <Icon name='checkmark' /> : <Icon name='cancel' />
        }
      </Card.Meta>
      <Card.Description>
        {project.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='list' />
        {actions.length} actions
      </a>
    </Card.Content>
  </Card>
  );
}
 
export default ProjectCard;