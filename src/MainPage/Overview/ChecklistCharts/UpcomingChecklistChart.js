import {months} from "../../Checklist/Checklist";
import checked from "../../../Pictures/checked.png";

const UpcomingChecklistChart = ({checklist}) => {

    const getChecklistItems = () => {
        const filteredAndSorted = checklist
            .filter(item => !item.checked)
            .sort((a, b) => {
                const monthA = months.indexOf(a.month);
                const monthB = months.indexOf(b.month);
                return monthA - monthB;
            })

        return filteredAndSorted
            .slice(0, Math.min(4, filteredAndSorted.length))
            .map(item => {
                return (
                    <div className="upcomingChecklistItemContainer">
                        <div className="upcomingChecklistNameWrapper">
                            <img className="upcomingChecklistItemIcon" src={checked} alt=""/>
                            <div className="overviewChartsTitles">{item.name}</div>
                        </div>
                        <div className="overviewChartsTitles">{item.month}</div>
                    </div>
                )
            })
    }
    return (
        <div className="overviewChartCard upcomingChecklistChartContainer">
            <h5 className="overviewChartsTitles">Upcoming tasks</h5>
            <div className="upcomingChecklistItemList">
                {getChecklistItems()}
            </div>
        </div>
    )
}

export default UpcomingChecklistChart;