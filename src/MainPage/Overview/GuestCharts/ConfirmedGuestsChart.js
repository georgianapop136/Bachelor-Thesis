import {useEffect, useRef} from "react";
import {Chart} from "chart.js/auto";
import "../Overview.css"

const ConfirmedGuestsChart = ({guests}) => {
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
        let coming = 0;
        let notComing = 0;
        let unknown = 0;

        guests.forEach(guest => {
            if (guest.confirmed) {
                coming++;
            } else if (guest.confirmed === false) {
                notComing++;
            } else {unknown++;}
        })

        return [coming, notComing, unknown];
    }

    const initializeChart = () => {
        const chartCanvas = chartRef.current.getContext('2d');
        const data = {
            labels: ["Coming", "Not coming", "Unknown"],
            datasets: [
                {
                    data: calculateCharts(), // Example data values for each label
                    backgroundColor: ["#36A2EB", "#033c62", "#000000"],
                    hoverBackgroundColor: ["#36A2EB", "#033c62", "#000000"],
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
export default ConfirmedGuestsChart;



