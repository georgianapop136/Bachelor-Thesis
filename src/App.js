import './App.css';
import React from "react";
import LandingPage from "./LandingPage/LandingPage";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Authentication from "./Authentication/Authentication";
import MainPage from "./MainPage/MainPage";
import {createTheme, ThemeProvider} from "@mui/material";
import RSVP from "./RSVP/RSVP";

const theme = createTheme({
    palette: {
        primary: {
            main: '#3C7391',
        },
        secondary: {
            main: '#DEE8ED',
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route exact path="/authentication" element={<Authentication/>}/>
                    <Route exact path="/" element={<LandingPage/>}/>
                    <Route exact path="/main" element={<MainPage/>}/>
                    <Route exact path="/RSVP" element={<RSVP/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
