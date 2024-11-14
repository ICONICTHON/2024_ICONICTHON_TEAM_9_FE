import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import GlobalStyle from './styles/GlobalStyles';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { Provider } from 'react-redux';
import store from '../redux/store.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Footer from './components/common/Footer.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            {' '}
            {/* Redux Provider로 store 연결 */}
            <ThemeProvider theme={theme}>
                <DndProvider backend={HTML5Backend}>
                    <BrowserRouter>
                        <GlobalStyle />
                        <App />
                        <Footer />
                    </BrowserRouter>
                </DndProvider>
            </ThemeProvider>
        </Provider>
    </StrictMode>
);
