//* ------------------- DEPENDENCIES ------------------ *\\

//* Module imports
import { AppProps } from 'next/app';

//* Component imports
import Layout from '../components/Layout';

//* Style imports
import '../styles/globals.scss';

//* -------------------- COMPONENTS ------------------- *\\

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

//* --------------------- EXPORTS --------------------- *\\

export default MyApp;
