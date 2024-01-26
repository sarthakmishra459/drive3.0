import '../styles/globals.css'
import { AccountProvider } from './AccountContext';

function MyApp({ Component, pageProps }) {

  return (
    <AccountProvider>
      <Component {...pageProps} />
    </AccountProvider>

  );
}

export default MyApp
