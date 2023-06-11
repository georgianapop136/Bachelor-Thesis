import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useEffect, useState} from "react";

const ChecklistProgressChart = ({checklist}) => {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const elementPercentage = 100 / checklist.length;
        const checkedItemsNumber = checklist.filter((item) => item.checked).length;

        const newPercentage = elementPercentage * checkedItemsNumber;
        const newPercentageWithNoDecimals = (Math.round(newPercentage * 100) / 100).toFixed(0);

        setPercentage(newPercentageWithNoDecimals);

    }, [checklist])

    return (
        <div className="overviewChartCard overviewChecklistProgressChart">
            <h5 className="overviewChartsTitles">Checklist progress</h5>
            <div style={{width: 200, height: 200}}>
                <CircularProgressbar
                    value={percentage}
                    background={true}
                    backgroundPadding={10}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',

                        // Text size
                        textSize: '16px',

                        // How long animation takes to go from one percentage to another, in seconds
                        pathTransitionDuration: 0.5,

                        // Colors
                        pathColor: `#FFFFFF`,
                        textColor: '#FFFFFF',
                        trailColor: '#3C7391',
                        backgroundColor: '#3C7391',
                    })}
                />
            </div>
        </div>

    )
}

export default ChecklistProgressChart;