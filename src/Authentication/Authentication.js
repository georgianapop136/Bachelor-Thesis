import React from "react";
import "./Authentication.css";
import {useNavigate} from "react-router";
import {useState} from 'react';
import authRightFlower from "../Pictures/authRightFlower.png";
import authLeftFlower from "../Pictures/authLeftFlower.png";
import authDownRightFlower from "../Pictures/authDownRightFlower.png";
import authDownLeftFlower from "../Pictures/authDownLeftFlower.png";


const Authentication = () => {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isLoginError, setIsLoginError] = useState(false);

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerName, setRegisterName] = useState("");
    const [isRegisterError, setIsRegisterError] = useState(false);

    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUp = () => {
        setIsSignUp(true);
    }

    const handleSignIn = () => {
        setIsSignUp(false);
    }

    const handleLoginClick = async (event) => {
        event.preventDefault(); // prevent form submission

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: loginEmail, password: loginPassword}),
            });

            if (response.status === 200) {
                sessionStorage.setItem("loggedInUser", loginEmail);
                navigate("/main");
            } else if (response.status === 401) {
                setIsLoginError(true)
            }

        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

    const handleRegisterClick = async (event) => {
        event.preventDefault(); // prevent form submission

        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: registerEmail, password: registerPassword, name: registerName}),
            });

            if (response.status === 200) {
                navigate("/main");
            } else if (response.status === 409) {
                setIsRegisterError(true)
            }

        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

    const pinkBoxStyle = {
        transform: isSignUp ? 'translateX(80%)' : 'translateX(0%)'
    }

    const signInClassName = isSignUp ? 'nodisplay signIn' : 'signIn';
    const signUpClassName = isSignUp ? 'signUp' : 'nodisplay signUp';

    return (

        <div className="authContainer">
            <div className="authFlower1">
                <img className="authImgStyle" src={authLeftFlower}></img>
            </div>
            <div className="authFlower2">
                <img className="authImgStyle" src={authRightFlower}></img>
            </div>
            <div className="authFlower3">
                <img className="authImgStyle" src={authDownRightFlower}></img>
            </div>
            <div className="authFlower4">
                <img className="authImgStyle" src={authDownLeftFlower}></img>
            </div>
            <div className="welcome">
                <div className="pinkbox" style={pinkBoxStyle}>
                    <div className={signUpClassName}>
                        <h1 className="authH1">register</h1>
                        <form className="authForm" autoComplete="off">
                            <input className="authInput" type="text" placeholder="username"
                                   onChange={(e) => {
                                       setRegisterName(e.target.value)
                                       setIsRegisterError(false)
                                   }
                                   }/>
                            <input className="authInput" type="email" placeholder="email"
                                   onChange={(e) => {
                                       setRegisterEmail(e.target.value)
                                       setIsRegisterError(false)
                                   }}/>
                            <input className="authInput" type="password" placeholder="password"
                                   onChange={(e) => {
                                       setRegisterPassword(e.target.value)
                                       setIsRegisterError(false)
                                   }}/>
                            <input className="authInput" type="password" placeholder="confirm password"/>
                            {isRegisterError ? <div>User already exists!</div> : null}
                            <button onClick={handleRegisterClick} className="authButton authButton2 authSubmit">create
                                account
                            </button>
                        </form>
                    </div>
                    <div className={signInClassName}>
                        <h1 className="authH1">sign in</h1>
                        <form className="more-padding authForm" autoComplete="off">
                            <input
                                className="authInput"
                                type="text"
                                onChange={(e) => {
                                    setLoginEmail(e.target.value)
                                    setIsLoginError(false)
                                }}
                                placeholder="email"/>
                            <input className="authInput"
                                   type="password"
                                   placeholder="password"
                                   onChange={(e) => {
                                       setLoginPassword(e.target.value)
                                       setIsLoginError(false)
                                   }}/>
                            <div className="authCheckbox">
                                <input className="authInput" type="checkbox" id="remember"/>
                                <label className="authLabel" htmlFor="remember">remember me</label>
                            </div>

                            {isLoginError ? <div>Wrong email or password</div> : null}
                            <button onClick={handleLoginClick} className="authButton authButton2 authSubmit">login
                            </button>
                        </form>
                    </div>
                </div>
                <div className="leftbox">
                    <h2 className="authTitle"><span className="authSpan">BLOOM</span>&<br/>BOUQUET</h2>
                    <p className="authDesc authP">pick your perfect <span className="authSpan">bouquet</span></p>
                    <img className="flower smaller" src="https://image.ibb.co/d5X6pn/1357d638624297b.jpg"
                         alt="1357d638624297b" border="0"/>
                    <p className="account authP">have an account?</p>
                    <button className="authButton authButton2" id="signIn" onClick={handleSignIn}>login</button>
                </div>
                <div className="rightbox">
                    <h2 className="authTitle"><span className="authSpan">BLOOM</span>&<br/>BOUQUET</h2>
                    <p className="authDesc authP"> pick your perfect <span className="authSpan">bouquet</span></p>
                    <img alt="" className="flower" src="https://preview.ibb.co/jvu2Un/0057c1c1bab51a0.jpg"/>
                    <p className="account authP">don't have an account?</p>
                    <button className="authButton authButton2" id="signUp" onClick={handleSignUp}>sign up</button>
                </div>
            </div>
        </div>);
}

export default Authentication;