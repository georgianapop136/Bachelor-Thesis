import './App.css';
import React from "react";
import LandingPage from "./LandingPage/LandingPage";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Authentication from "./Authentication/Authentication";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/authentication" element={<Authentication />} />
                <Route exact path="/" element={<LandingPage />} />
            </Routes>
        </Router>
    );
}

export default App;
