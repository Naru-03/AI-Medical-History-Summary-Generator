// Main App component
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Summary from './pages/Summary';

function App() {
    return ( <
        Router >
        <
        Routes >
        <
        Route path = "/"
        element = {
            < Login / >
        }
        /> <
        Route path = "/dashboard"
        element = {
            < Dashboard / >
        }
        /> <
        Route path = "/summary"
        element = {
            < Summary / >
        }
        /> <
        /Routes> <
        /Router>
    );
}

export default App;