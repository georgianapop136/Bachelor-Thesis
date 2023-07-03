import React from "react";
import "./Authentication.css";
import {useNavigate} from "react-router";
import {useState} from 'react';
import authCorner1 from "../Pictures/authCorner1.png";
import authCorner3 from "../Pictures/authCorner3.png";
import authWhiteFlower from "../Pictures/authWhiteFlower.png";
import authRose from "../Pictures/authRose.png";

const Authentication = () => {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState(null);

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerName, setRegisterName] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
    const [registerError, setRegisterError] = useState(null);

    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUp = () => {
        setIsSignUp(true);
    }

    const handleSignIn = () => {
        setIsSignUp(false);
    }

    const handleLoginClick = async (event) => {
        if (!loginEmail || !loginPassword) {
            setLoginError("Email and password required")
        } else {
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
                    setLoginError("Wrong username or password")
                }
            } catch (error) {
                console.error('Error while fetching data', error);
            }
        }
    }

    const handleRegisterClick = async (event) => {
        if (!registerEmail || !registerPassword || !registerName || !registerConfirmPassword) {
            setRegisterError("All values are required!")
        } else if (registerPassword !== registerConfirmPassword) {
            setRegisterError("Passwords not matching!")
        } else if (registerPassword.length < 6) {
            setRegisterError("Password must be at least 6 characters!");
        } else {
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
                    sessionStorage.setItem("loggedInUser", registerEmail);
                    navigate("/main");
                } else if (response.status === 409) {
                    setRegisterError("User already registered!")
                }

            } catch (error) {
                console.error('Error while fetching data', error);
            }
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
                <img className="authImgStyle" src={authCorner3}></img>
            </div>

            <div className="authFlower3">
                <img className="authImgStyle" src={authCorner1}></img>
            </div>
            <div className="welcome">
                <div className="pinkbox" style={pinkBoxStyle}>
                    <div className={signUpClassName}>
                        <h1 className="authH1">register</h1>
                        <div className="authForm">
                            <input className="authInput" type="text" placeholder="username"
                                   onChange={(e) => {
                                       setRegisterName(e.target.value)
                                       setRegisterError(false)
                                   }
                                   }/>
                            <input className="authInput" type="email" placeholder="email"
                                   onChange={(e) => {
                                       setRegisterEmail(e.target.value)
                                       setRegisterError(false)
                                   }}/>
                            <input className="authInput" type="password" placeholder="password"
                                   onChange={(e) => {
                                       setRegisterPassword(e.target.value)
                                       setRegisterError(false)
                                   }}/>
                            <input
                                className="authInput"
                                onChange={(e) => {
                                    setRegisterConfirmPassword(e.target.value)
                                    setRegisterError(false)
                                }}
                                type="password" placeholder="confirm password"/>
                            {registerError ? registerError : null}
                            <button onClick={handleRegisterClick} className="authButton authButton2 authSubmit">create
                                account
                            </button>
                        </div>
                    </div>
                    <div className={signInClassName}>
                        <h1 className="authH1">sign in</h1>
                        <div className="more-padding authForm">
                            <input
                                className="authInput"
                                type="text"
                                onChange={(e) => {
                                    setLoginEmail(e.target.value)
                                    setLoginError(null)
                                }}
                                placeholder="email"/>
                            <input className="authInput"
                                   type="password"
                                   placeholder="password"
                                   onChange={(e) => {
                                       setLoginPassword(e.target.value)
                                       setLoginError(null)
                                   }}/>

                            {loginError ? loginError : null}
                            <button onClick={handleLoginClick} className="authButton authButton2 authSubmit">log in
                            </button>
                        </div>
                    </div>
                </div>
                <div className="leftbox">
                    <h2 className="authTitle"><span className="authSpan">Iconic Dream</span><br/>Occasions</h2>
                    <p className="authDesc authP">make your perfect <span className="authSpan">wedding</span></p>
                    <img className="smaller" src={authRose}
                         alt="1357d638624297b" border="0"/>
                    <p className="account authP">have an account?</p>
                    <button className="authButton authButton2" id="signIn" onClick={handleSignIn}>login</button>
                </div>
                <div className="rightbox">
                    <h2 className="authTitle"><span className="authSpan">Iconic Dream</span><br/>Occasions</h2>
                    <p className="authDesc authP"> make your perfect <span className="authSpan">wedding</span></p>
                    <img alt="" className="flower" src={authWhiteFlower}/>
                    <p className="account authP">don't have an account?</p>
                    <button className="authButton authButton2" id="signUp" onClick={handleSignUp}>sign up</button>
                </div>
            </div>
        </div>);
}

export default Authentication;