import {useEffect, useRef} from "react";
import {Chart} from "chart.js/auto";
import "../Overview.css"

const MyBudgetChart = ({categories, budget}) => {
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
    }, [categories, budget]);


    const calculateCharts = () => {
        let totalExpenses = 0;

        categories.forEach(category => {
            category.expenses.forEach(expense => {
                totalExpenses = totalExpenses + expense.value;
            })
        })

        return [budget - totalExpenses, totalExpenses];
    }

    const initializeChart = () => {
        const chartCanvas = chartRef.current.getContext('2d');
        const data = {
            labels: ["Remaining", "Expenses"],
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
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        };


        chartInstance = new Chart(chartCanvas, {
            type: 'doughnut',
            data: data,
            options: options,
        });

    };

    return <div className="overviewChartCard myBudgetChartContainer">
        <h5 className="overviewChartsTitles">My Budget</h5>
        <div className="myBudgetChartWrapper">
            <canvas ref={chartRef}/>
        </div>
    </div>;
}
export default MyBudgetChart;



