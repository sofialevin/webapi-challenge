import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/projects')
        .then(res => {
          setProjects(res.data.projects)
        })
        .catch(err => console.log(err))
  }, [])

  console.log(projects)

  return (
    <div className="App">
      <ul>
      {
        projects.map((project) => <li>{project.name}</li>)
      }
      </ul>
    </div>
  );
}

export default App;
