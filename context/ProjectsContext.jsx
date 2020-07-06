import React, {useState, useContext} from 'react'

const ProjectContext = React.createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({children}) => {
  const [projects, setProjects] = useState([])
  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
