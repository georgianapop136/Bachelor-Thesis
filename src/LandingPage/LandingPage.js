import React, {useEffect, useRef, useState} from "react";
import "./LandingPage.css";
import Rellax from "rellax";
import {Button} from "@mui/material";
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
        <div>
            <section className="section section-top">
                <div className="content rellax" data-rellax-speed="5">
                    <h1>Don't just start. Continue. Ship. Repeat.</h1>
                    <Button onClick={handleClick}>Join us!</Button>
                </div>
            </section>
            <div id="app" className="landingPageContainer">
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
            {/*<section className="section section-stream">*/}
            {/*    /!*<img*!/*/}
            {/*    /!*    className="play rellax"*!/*/}
            {/*    /!*    src="https://i.ibb.co/Fn2SWJh/play.png"*!/*/}
            {/*    /!*    alt="Play"*!/*/}
            {/*    /!*    data-rellax-speed="0"*!/*/}
            {/*    /!*    data-rellax-xs-speed="-5"*!/*/}
            {/*    <div className="content rellax" data-rellax-speed="10">*/}
            {/*        <div>*/}
            {/*            <h2 className="secondary-text">Stream Everything</h2>*/}
            {/*            <p>*/}
            {/*                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque*/}
            {/*                fugit molestiae placeat nesciunt autem et quos sapiente voluptates,*/}
            {/*                magnam doloribus?*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <h2 className="secondary-text">Short is the New Long</h2>*/}
            {/*            <p>*/}
            {/*                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque*/}
            {/*                fugit molestiae placeat nesciunt autem et quos sapiente voluptates,*/}
            {/*                magnam doloribus?*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
            {/*<section className="section section-grid">*/}
            {/*    <div className="rellax" data-rellax-speed="1" data-rellax-xs-speed="3">*/}
            {/*        <i className="fas fa-video fa-3x secondary-text"></i>*/}
            {/*        <h2>Watch<span className="secondary-text dot">.</span></h2>*/}
            {/*        <p>*/}
            {/*            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque fugit*/}
            {/*            molestiae placeat nesciunt autem et quos sapiente voluptates, magnam*/}
            {/*            doloribus?*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*    <div className="rellax" data-rellax-speed="4" data-rellax-xs-speed="3">*/}
            {/*        <i className="fas fa-users fa-3x secondary-text"></i>*/}
            {/*        <h2>Share<span className="secondary-text dot">.</span></h2>*/}
            {/*        <p>*/}
            {/*            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque fugit*/}
            {/*            molestiae placeat nesciunt autem et quos sapiente voluptates, magnam*/}
            {/*            doloribus?*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*    <div className="rellax" data-rellax-speed="7" data-rellax-xs-speed="3">*/}
            {/*        <i className="fas fa-book fa-3x secondary-text"></i>*/}
            {/*        <h2>Learn<span className="secondary-text dot">.</span></h2>*/}
            {/*        <p>*/}
            {/*            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque fugit*/}
            {/*            molestiae placeat nesciunt autem et quos sapiente voluptates, magnam*/}
            {/*            doloribus?*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </div>
    );
}

export default LandingPage;