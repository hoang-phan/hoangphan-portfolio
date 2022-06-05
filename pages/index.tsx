import type { NextPage } from 'next'
import { useContext } from 'react';
import { AppContext } from '../contexts/AppProvider'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import API from '../services/api';
import { writeFile } from 'fs';
import { promisify } from 'util';

const writeFilePromise = promisify(writeFile);
const MainScene = dynamic(() => import('../components/MainScene'), {
  ssr: false,
  loading: () => <p>Loading...</p>
})

const Home: NextPage = () => {
  const { projects, setProjects } = useContext(AppContext);

  return (
    <div style={{overflow: "hidden"}}>
      <Head>
        <title> Hoang Phan </title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <MainScene />
    </div>
  )
}

async function saveStaticImage(url) {
  const imgPaths = url.split("/");
  const imgPath = imgPaths[imgPaths.length - 1];
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  writeFilePromise("public/build/" + imgPath, Buffer.from(buffer));

  return imgPath;
}

export async function getStaticProps() {
  const projects = await API.get('projects');
  const petProjects = await API.get('pet_projects');

  for (let project of projects) {
    project.company.logo = await saveStaticImage(project.company.logo_url);
    if (project.image_url) {
      project.image = await saveStaticImage(project.image_url);
    }
  }

  for (let project of petProjects) {
    project.image = await saveStaticImage(project.image_url);
  }

  return {
    props: { projects, petProjects }
  }
}

export default Home
