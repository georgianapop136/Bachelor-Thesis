import React, {useState, useEffect} from 'react';
import "./WeddingDateTimer.css"

const zerofill = num => ((num < 10 && num >= 0) ? `0${num}` : num);

const SvgCircle = (props) => {
    const {className, done, max, radius, stroke, strokeWidth} = props
    const size = (radius + strokeWidth) * 2
    const length = Math.ceil(2 * radius * Math.PI)
    const remainingLength = length - (Math.ceil(2 * radius * Math.PI) * (done / max))
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g>
                <circle
                    className="timerCircle"
                    r={radius}
                    cx={radius + strokeWidth}
                    cy={radius + strokeWidth}
                    stroke={stroke}
                    strokeDasharray={length}
                    strokeDashoffset={remainingLength}
                    strokeLinecap="round"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    className="circle--bg"
                    r={radius}
                    cx={radius + strokeWidth}
                    cy={radius + strokeWidth}
                    stroke="rgba(0, 0, 0, .1)"
                    strokeLinecap="round"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
            </g>
        </svg>
    )
}

SvgCircle.defaultProps = {
    done: 0,
    max: 24,
    radius: 72,
    stroke: '#3C7391',
    strokeWidth: 8,
}


const Clock = ({deadline}) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        getTimeUntil(deadline);
        const timerId = setInterval(() => getTimeUntil(deadline), 1000);
        return () => {
            clearInterval(timerId);
        };
    }, [deadline]);

    const getTimeUntil = (deadline) => {
        const time = Date.parse(deadline) - Date.parse(new Date());
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const days = Math.floor(time / (1000 * 60 * 60 * 24));

        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
    };

    return (
        <div className="overviewChartCard timerContainer">
            <h5 className="overviewChartsTitles">Time until wedding</h5>
            <div className="timersWrapper">
                <div className="clockDisplay">
                    <SvgCircle max={365} done={days}/>
                    <div className="clockText">
                        <span className="clockAmount">{zerofill(days)}</span>
                        <span className="clockUnit">days</span>
                    </div>
                </div>
                <div className="clockDisplay">
                    <SvgCircle max={24} done={hours}/>
                    <div className="clockText">
                        <span className="clockAmount">{zerofill(hours)}</span>
                        <span className="clockUnit">hours</span>
                    </div>
                </div>
                <div className="clockDisplay">
                    <SvgCircle max={60} done={minutes}/>
                    <div className="clockText">
                        <span className="clockAmount">{zerofill(minutes)}</span>
                        <span className="clockUnit">minutes</span>
                    </div>
                </div>
                <div className="clockDisplay">
                    <SvgCircle max={60} done={seconds}/>
                    <div className="clockText">
                        <span className="clockAmount">{zerofill(seconds)}</span>
                        <span className="clockUnit">seconds</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clock;
