import React, {useEffect} from "react";
import "./LandingPage.css";
import Rellax from "rellax";
import {useNavigate} from "react-router";
import Card from "./Card";
import GreenLogo from "../Pictures/GreenLogo.png";


const LandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        new Rellax(".rellax");
    }, [])

    const handleClick = () => {
        navigate("/authentication");
    }

    return (
        <div className="landingPageContainer">
            <div className="landingPageTitle">
                <img className="logo" src={GreenLogo}></img>
            </div>
            <div id="app" className="landingPageCards">
                <Card
                    dataImage="https://images.unsplash.com/photo-1533741761835-c67cadbffd3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=402&q=80">
                    <h1>Checklist</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </Card>
                <Card
                    dataImage="https://images.pexels.com/photos/4968653/pexels-photo-4968653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
                    <h1>Budget</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </Card>
                <Card
                    dataImage="https://images.pexels.com/photos/11994914/pexels-photo-11994914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
                    <h1>Seating</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </Card>
                <Card
                    dataImage="https://images.pexels.com/photos/4545092/pexels-photo-4545092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
                    <h1>Invitation</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </Card>
            </div>

            <div className="joinButton">
                <div onClick={handleClick} className="svg-wrapper">
                    <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                        <rect className="shape" height="60" width="320"/>
                    </svg>
                    <div className="text">JOIN US!</div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;