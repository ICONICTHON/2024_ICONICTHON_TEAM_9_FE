import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import GlobalStyle from './styles/GlobalStyles';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { Provider } from 'react-redux';
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <GlobalStyle />
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
