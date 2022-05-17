import type { NextPage } from 'next'
import { useContext } from 'react';
import { AppContext } from '../contexts/AppProvider'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import API from '../services/api';

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

export async function getStaticProps() {
  const projects = await API.get('projects');
  const petProjects = await API.get('pet_projects');

  return {
    props: { projects, petProjects }
  }
}


export default Home
