import 'minireset.css/minireset.css';
import '../styles/globals.css';
import wrapper from '../store/store';

if (process.env.NODE_ENV === 'development') {
  if(typeof window !== 'undefined') {
    const { worker } = require('../mocks/browser');
    worker.start({
      onUnhandledRequest: 'bypass'
    });
  }
}

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(App);
