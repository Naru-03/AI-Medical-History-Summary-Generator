// Main App component
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { NotificationProvider } from './components/NotificationSystem';
import { ThemeProvider } from './components/ThemeProvider';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Summary from './pages/Summary';
import History from './pages/History';
import Settings from './pages/Settings';
import NotificationTest from './pages/NotificationTest';
import ThemeTest from './pages/ThemeTest';

function App() {
    return (
        <ThemeProvider>
            <NotificationProvider>
                <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={
                        <>
                            <Navigation />
                            <Dashboard />
                        </>
                    } />
                    <Route path="/summary" element={
                        <>
                            <Navigation />
                            <Summary />
                        </>
                    } />
                    <Route path="/history" element={
                        <>
                            <Navigation />
                            <History />
                        </>
                    } />
                    <Route path="/settings" element={
                        <>
                            <Navigation />
                            <Settings />
                        </>
                    } />
                    <Route path="/test-notifications" element={
                        <>
                            <Navigation />
                            <NotificationTest />
                        </>
                    } />
                    <Route path="/test-theme" element={
                        <>
                            <Navigation />
                            <ThemeTest />
                        </>
                    } />
                </Routes>
                </Router>
            </NotificationProvider>
        </ThemeProvider>
    );
}

export default App;