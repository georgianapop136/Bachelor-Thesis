import "./Checklist.css";
import {useEffect, useState} from "react";


const ChecklistProgress = ({checklist}) => {
    const [progressPercentage, setProgressPercentage] = useState(0);

    useEffect(() => {
        let widthPercentage = 0;


        if (checklist.length > 0) {
            const elementPercentage = 100 / checklist.length;
            const checkedItemsNumber = checklist.filter((item) => item.checked).length;

            widthPercentage = elementPercentage * checkedItemsNumber;
        }

        const progressBarPercentage = document.getElementById("checklistProgressId");
        progressBarPercentage.style.width = `${widthPercentage}%`;

        if (widthPercentage > 0) {
            progressBarPercentage.style.backgroundColor = "#3C7391";
        }

        setProgressPercentage(widthPercentage);

    }, [checklist])

    return (
        <div className="checklistProgressBarContainer">
            <h1 className="checklistTitles">Checklist</h1>
            <div>
                <p>You've completed {checklist.filter(item => item.checked).length} out of {checklist.length} tasks</p>
                <div className="checklistProgressBar">
                    <div id="checklistProgressId" className="checklistProgressBarInner">
                        {progressPercentage !== 0 ? `${(Math.round(progressPercentage * 100) / 100).toFixed(0)}%` : null}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ChecklistProgress;