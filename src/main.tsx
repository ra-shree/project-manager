import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './utils';
import App from './app';

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>
);
