import React, { useState, useRef } from "react";
import "./LandingPage.css";

const Card = ({ dataImage, children }) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [mouseLeaveDelay, setMouseLeaveDelay] = useState(null);
    const cardRef = useRef(null);

    const mousePX = mouseX / width;
    const mousePY = mouseY / height;

    const cardStyle = {
        transform: `rotateY(${mousePX * 30}deg) rotateX(${-mousePY * 30}deg)`,
    };

    const cardBgTransform = {
        transform: `translateX(${-mousePX * 40}px) translateY(${-mousePY * 40}px)`,
    };

    const cardBgImage = {
        backgroundImage: `url(${dataImage})`,
    };

    const handleMouseMove = (e) => {
        const { offsetLeft, offsetTop } = cardRef.current;
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        setMouseX(e.pageX - offsetLeft - halfWidth);
        setMouseY(e.pageY - offsetTop - halfHeight);
    };

    const handleMouseEnter = () => {
        clearTimeout(mouseLeaveDelay);
    };

    const handleMouseLeave = () => {
        setMouseLeaveDelay(
            setTimeout(() => {
                setMouseX(0);
                setMouseY(0);
            }, 1000)
        );
    };

    const handleCardRef = (node) => {
        if (node !== null) {
            setWidth(node.offsetWidth);
            setHeight(node.offsetHeight);
            cardRef.current = node;
        }
    };

    return (
        <div
            className="customCard-wrap"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={handleCardRef}
        >
            <div className="customCard" style={cardStyle}>
                <div className="customCard-bg" style={{...cardBgTransform, ...cardBgImage}}></div>
                <div className="customCard-info">{children}</div>
            </div>
        </div>
    );
};

export default Card;