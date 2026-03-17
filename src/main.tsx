import ReactDOM from 'react-dom/client';
import App from './app';

import { HelmetProvider } from 'react-helmet-async';
import { AppContextProvider } from './app/context/AppContext';
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <HelmetProvider>
        <AppContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AppContextProvider>
    </HelmetProvider>
);