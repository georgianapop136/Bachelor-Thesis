import {useEffect, useRef} from "react";
import {Chart} from "chart.js/auto";
import "./Overview.css"

const ChecklistChart = ({checklist}) => {
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
    }, []);


    const calculateCharts = () => {
        let completed = 0;
        let notCompleted = 0;

        checklist.forEach(item => {
            if (item.checked === true) {
                completed++;
            } else {
                notCompleted++;
            }
        })

        return [completed, notCompleted];
    }

    const initializeChart = () => {
        const chartCanvas = chartRef.current.getContext('2d');
        const data = {
            labels: ['Completed', 'Not Completed'],
            datasets: [
                {
                    data: calculateCharts(), // Example data values for each label
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB'
                    ],
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

    return <div className="chartContainer">
        <canvas ref={chartRef}/>
    </div>;
}
export default ChecklistChart;



