import React from 'react';
import ReactDOM from 'react-dom';

import { LandingPage } from './pages/LandingPage';
import './index.css';

if (module.hot) module.hot.accept();

ReactDOM.render(
    <LandingPage />,
    document.getElementById('app'),
);
