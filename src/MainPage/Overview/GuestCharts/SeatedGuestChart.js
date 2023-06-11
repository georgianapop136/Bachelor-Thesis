import {useEffect, useRef} from "react";
import {Chart} from "chart.js/auto";
import "../Overview.css"

const SeatedGuestsChart = ({guests}) => {
    const chartRef = useRef(null);
    let chartInstance = null;

    useEffect(() => {
        if (chartRef.current) {
            initializeChart();
        }

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [guests]);


    const calculateCharts = () => {
        let withSeat = 0;
        let withoutSeat = 0;

        guests.forEach(guest => {
            if (guest.seating_id) {
                withSeat++;
            } else {
                withoutSeat++;
            }
        })

        return [withSeat, withoutSeat];
    }

    const initializeChart = () => {
        const chartCanvas = chartRef.current.getContext('2d');
        const data = {
            labels: ["With seat", "Without seat"],
            datasets: [
                {
                    data: calculateCharts(), // Example data values for each label
                    backgroundColor: ["#36A2EB", "#033c62"],
                    hoverBackgroundColor: ["#36A2EB", "#033c62"],
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            // You can customize other options as needed
        };


        chartInstance = new Chart(chartCanvas, {
            type: 'pie',
            data: data,
            options: options,
        });

    };

    return <div className="confirmedGuestListChartContainer">
        <canvas ref={chartRef}/>
    </div>;
}
export default SeatedGuestsChart;



