import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { Card } from 'semantic-ui-react';
import ProjectCard from './components/ProjectCard.js'


function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/projects')
        .then(res => {
          console.log(res)
          setProjects(res.data)
        })
        .catch(err => console.log(err))
  }, [])

  console.log(projects)

  return (
    <div className="App">
      <h1>Web API Challenge</h1>
      <Card.Group>
      {
        projects.map((project) => <ProjectCard project={project}/>)
      }
      </Card.Group>
    </div>
  );
}

export default App;
