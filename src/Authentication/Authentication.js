import {useEffect} from "react";
import "./Authentication.css";
import {useNavigate} from "react-router";

function Authentication() {
    const navigate = useNavigate();
    useEffect(() => {
        const signUpButton = document.getElementById("signUp");
        const signInButton = document.getElementById("signIn");
        const container = document.getElementById("container");

        signUpButton.addEventListener("click", () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener("click", () => {
            container.classList.remove("right-panel-active");
        });

        const labels = document.querySelectorAll(".form-control label");

        labels.forEach((label) => {
            label.innerHTML = label.innerText
                .split("")
                .map(
                    (letter, idx) =>
                        `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
                )
                .join("");
        });
    }, [])


    function handleClick() {
        navigate("/main");
    }

    return (
        <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form>
                    <h1>Sign Up</h1>
                    <span>or use your email for registration</span>
                    <div className="form-control">
                        <input type="text" required/>
                        <label>Name</label>
                    </div>
                    <div className="form-control">
                        <input type="text" required/>
                        <label>Email</label>
                    </div>
                    <div className="form-control">
                        <input type="password" required/>
                        <label>Password</label>
                    </div>
                    <button onClick={handleClick}>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form>
                    <h1>Sign In</h1>
                    <span>or use your account</span>
                    <div className="form-control">
                        <input type="text" required/>
                        <label>Email</label>
                    </div>
                    <div className="form-control">
                        <input type="password" required/>
                        <label>Password</label>
                    </div>
                    <a href="#">Forgot your password?</a>
                    <button onClick={handleClick}>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>Please login with your personal info</p>
                        <button className="ghost" id="signIn">Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start your journey with us</p>
                        <button className="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>)
}

export default Authentication;