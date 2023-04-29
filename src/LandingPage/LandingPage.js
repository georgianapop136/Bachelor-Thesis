import React, {useEffect, useRef, useState} from "react";
import "./LandingPage.css";
import Rellax from "rellax";
import {useNavigate, useNavigation} from "react-router";
import Card from "./Card";


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

            <div className="landingPageTitle">Title</div>
            <div id="app" className="landingPageCards">
                <Card
                    dataImage="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=">
                    <h1>Canyons</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </Card>
                <Card
                    dataImage="https://images.unsplash.com/photo-1479659929431-4342107adfc1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=">
                    <h1>Beaches</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </Card>
                <Card
                    dataImage="https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=">
                    <h1>Trees</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </Card>
                <Card
                    dataImage="https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=">
                    <h1>Lakes</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </Card>
            </div>
            {/*<div className="landingPageJoinBtn-container">*/}
            {/*    <span onClick={handleClick} className="landingPageJoinBtn">Join us!</span>*/}
            {/*</div>*/}

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