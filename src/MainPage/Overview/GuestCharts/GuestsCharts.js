import React from "react";
import ConfirmedGuestsChart from "./ConfirmedGuestsChart";
import SeatedGuestsChart from "./SeatedGuestChart";


const GuestsCharts = ({guestList}) => {

    return (
        <div className="overviewChartCard overviewGuestCharts">
            <div className="overviewGuestChartWrapper">
                <h5 className="overviewChartsTitles">Confirmed guests</h5>
                <ConfirmedGuestsChart guests={guestList}/>
            </div>
            <div className="overviewGuestChartWrapper">
                <h5 className="overviewChartsTitles">Seated guests</h5>
                <SeatedGuestsChart guests={guestList} />
            </div>
        </div>
    )
}

export default GuestsCharts