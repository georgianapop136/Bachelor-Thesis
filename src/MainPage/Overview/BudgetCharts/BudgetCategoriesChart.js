import {useEffect, useRef} from "react";
import {Chart} from "chart.js/auto";
import "../Overview.css"

const BudgetCategoriesChart = ({categories}) => {
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
    }, [categories]);


    const calculateCharts = () => {

        return categories.map(category => {
            let totalExpenses = 0;
            category.expenses.forEach(expense => {
                totalExpenses = totalExpenses + expense.value;
            })

            return totalExpenses;
        })
    }

    const calculateColors = () => {
        return categories.map(category => {
            if (category.icon_number === 1) {
                return "#36A2EB"
            } else if (category.icon_number === 2) {
                return "#14679d"
            } else if (category.icon_number === 3) {
                return "#033c62"
            } else if (category.icon_number === 4) {
                return "#b0c8d9"
            }
        })
    }

    const initializeChart = () => {
        const chartCanvas = chartRef.current.getContext('2d');
        const data = {
            labels: categories.map(category => category.name),
            datasets: [
                {
                    label: "Budget expenses",
                    data: calculateCharts(), // Example data values for each label
                    backgroundColor: calculateColors(),
                    hoverBackgroundColor: calculateColors(),
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            // You can customize other options as needed
        };


        chartInstance = new Chart(chartCanvas, {
            type: 'bar',
            data: data,
            options: options,
        });

    };

    return <div className="overviewChartCard overviewBudgetBarChart">
        <canvas ref={chartRef}/>
    </div>;
}
export default BudgetCategoriesChart;



