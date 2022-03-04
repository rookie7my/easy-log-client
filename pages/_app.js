import 'minireset.css/minireset.css';
import '../styles/globals.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';

import store from '../store/store';

if (process.env.NODE_ENV === 'development') {
  if(typeof window !== 'undefined') {
    const { worker } = require('../mocks/browser');
    worker.start({
      onUnhandledRequest: 'bypass'
    });
  }
}

const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
