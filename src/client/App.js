import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import { render } from 'react-dom'
import Routes from './Routes'

import './index.css'

render(
    <CookiesProvider>
        <Router>
            <Routes />
        </Router>
    </CookiesProvider>,
    document.getElementById('react-root')
)