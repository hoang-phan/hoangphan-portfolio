import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppProvider } from '../contexts/AppProvider';
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider initialProjects={pageProps?.projects} initialPetProjects={pageProps?.petProjects}>
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
    </AppProvider>
  )
}

export default MyApp
