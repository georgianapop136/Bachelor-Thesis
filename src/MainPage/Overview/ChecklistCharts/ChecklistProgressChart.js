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
                        strokeLinecap: 'butt',
                        textSize: '16px',
                        pathTransitionDuration: 0.5,
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