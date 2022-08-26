import { Footer, Header } from '@components/shared';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
		<>
			<Header />
    	<Component {...pageProps} />
			<Footer />
		</>
  );
}

export default MyApp;
