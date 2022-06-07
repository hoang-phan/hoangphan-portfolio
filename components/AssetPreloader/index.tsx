import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppProvider';

const AssetPreloader: React.FC = () => {
  const context: any = useContext(AppContext);
  const { projects, petProjects } = context;

  return (
    <div style={{display: "none"}}>
      {petProjects.map(project => (
        <img key={project.id} src={`build/${project.image}`} />
      ))}
      {projects.map(project => (
        <div key={project.id}>
          <img src={`build/${project.image}`} />
          <img src={`build/${project.company.logo}`} />
        </div>
      ))}
      {
        Array.from(Array(10).keys()).map((i) => <img src={`/Idle__00${i}.png`} key={i} />)
      }
      {
        Array.from(Array(10).keys()).map((i) => <img src={`/Run__00${i}.png`} key={i} />)
      }
      {
        Array.from(Array(10).keys()).map((i) => <img src={`/Jump__00${i}.png`} key={i} />)
      }
      <img src="lyr1-1.png" />
      <img src="lyr1-2.png" />
      <img src="lyr1-3.png" />
      <img src="lyr1-4.png" />
      <img src="lyr2-1.png" />
      <img src="lyr2-2.png" />
      <img src="lyr2-3.png" />
      <img src="lyr2-4.png" />
      <img src="shuriken-1.png" />
      <img src="shuriken-2.png" />
    </div>
  );
}

export default AssetPreloader;
