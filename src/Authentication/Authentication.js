import {useEffect} from "react";
import "./Authentication.css";
import {useNavigate} from "react-router";

import {useState} from 'react';

const Authentication = () => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUp = () => {
        setIsSignUp(true);
    }

    const handleSignIn = () => {
        setIsSignUp(false);
    }

    const handleClick = () => {
        navigate("/main");
    }

    const pinkBoxStyle = {
        transform: isSignUp ? 'translateX(80%)' : 'translateX(0%)'
    }

    const signInClassName = isSignUp ? 'nodisplay signIn' : 'signIn';
    const signUpClassName = isSignUp ? 'signUp' : 'nodisplay signUp';

    return (
        <div className="authContainer">
            <div className="welcome">
                <div className="pinkbox" style={pinkBoxStyle}>
                    <div className={signUpClassName}>
                        <h1 className="authH1">register</h1>
                        <form className="authForm" autoComplete="off">
                            <input className="authInput" type="text" placeholder="username"/>
                            <input className="authInput" type="email" placeholder="email"/>
                            <input className="authInput" type="password" placeholder="password"/>
                            <input className="authInput" type="password" placeholder="confirm password"/>
                            <button className="authButton authButton2 authSubmit">create account</button>
                        </form>
                    </div>
                    <div className={signInClassName}>
                        <h1 className="authH1">sign in</h1>
                        <form className="more-padding authForm" autoComplete="off">
                            <input className="authInput" type="text" placeholder="username"/>
                            <input className="authInput" type="password" placeholder="password"/>
                            <div className="authCheckbox">
                                <input className="authInput" type="checkbox" id="remember"/>
                                <label className="authLabel" htmlFor="remember">remember me</label>
                            </div>

                            <button onClick={handleClick} className="authButton authButton2 authSubmit">login</button>
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

//
// const Authentication = () => {
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         const signUpButton = document.getElementById("signUp");
//         const signInButton = document.getElementById("signIn");
//         const authContainer = document.getElementById("authContainer");
//
//         signUpButton.addEventListener("click", () => {
//             authContainer.classNameList.add("right-panel-active");
//         });
//
//         signInButton.addEventListener("click", () => {
//             authContainer.classNameList.remove("right-panel-active");
//         });
//
//         const labels = document.querySelectorAll(".form-control label");
//
//         labels.forEach((label) => {
//             label.innerHTML = label.innerText
//                 .split("")
//                 .map(
//                     (letter, idx) =>
//                         `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
//                 )
//                 .join("");
//         });
//     }, [])
//
//
//     const handleClick = () => {
//         navigate("/main");
//     }
//
//     return (
//         <div classNameName="authContainer" id="authContainer">
//             <div classNameName="form-container sign-up-container">
//                 <form>
//                     <h3>Sign Up</h3>
//                     <span>or use your email for registration</span>
//                     <div classNameName="authFormControl">
//                         <input type="text" required/>
//                         <label>Name</label>
//                     </div>
//                     <div classNameName="authFormControl">
//                         <input type="text" required/>
//                         <label>Email</label>
//                     </div>
//                     <div classNameName="authFormControl">
//                         <input type="password" required/>
//                         <label>Password</label>
//                     </div>
//                     <button onClick={handleClick}>Sign Up</button>
//                 </form>
//             </div>
//             <div classNameName="form-container sign-in-container">
//                 <form>
//                     <h3>Sign In</h3>
//                     <span>or use your account</span>
//                     <div classNameName="authFormControl">
//                         <input type="text" required/>
//                         <label>Email</label>
//                     </div>
//                     <div classNameName="authFormControl">
//                         <input type="password" required/>
//                         <label>Password</label>
//                     </div>
//                     <a href="#">Forgot your password?</a>
//                     <button onClick={handleClick}>Sign In</button>
//                 </form>
//             </div>
//             <div classNameName="overlay-container">
//                 <div classNameName="overlay">
//                     <div classNameName="overlay-panel overlay-left">
//                         <h1>Welcome Back!</h1>
//                         <p>Please login with your personal info</p>
//                         <button classNameName="ghost" id="signIn">Sign In</button>
//                     </div>
//                     <div classNameName="overlay-panel overlay-right">
//                         <h1>Hello, Friend!</h1>
//                         <p>Enter your personal details and start your journey with us</p>
//                         <button classNameName="ghost" id="signUp">Sign Up</button>
//                     </div>
//                 </div>
//             </div>
//         </div>)
// }

export default Authentication;