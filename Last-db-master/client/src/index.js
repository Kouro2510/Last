import React,{ Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from './redux/store';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import 'animate.css';
import './Langue/i18n.js'
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Suspense fallback="...loading">
                    <App />
                </Suspense>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
