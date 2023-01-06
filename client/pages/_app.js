import '../styles/globals.css';
import '../styles/auth.css';
import { Toaster } from 'react-hot-toast';

import Layout from '../components/layout/Layout';
import AuthContextProvider from '../context/auth';

function MyApp({ Component, pageProps: { ...pageProps } }) {
  
  return (
    <AuthContextProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  )
}

export default MyApp;
