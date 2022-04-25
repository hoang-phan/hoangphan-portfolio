import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const MainScene = dynamic(() => import('../components/MainScene'), {
  ssr: false,
  loading: () => <p>Loading...</p>
})

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title> Hoang Phan </title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <MainScene />
    </div>
  )
}

export default Home
