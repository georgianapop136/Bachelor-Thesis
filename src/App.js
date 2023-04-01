import './App.css';
import React from "react";
import LandingPage from "./LandingPage/LandingPage";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Authentication from "./Authentication/Authentication";
import MainPage from "./MainPage/MainPage";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#7FBDBD',
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route exact path="/authentication" element={<Authentication/>}/>
                    <Route exact path="/" element={<LandingPage/>}/>
                    <Route exact path="/main" element={<MainPage/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
