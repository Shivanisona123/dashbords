import React from 'react';
import rawData from '../data';
import AlertsTable from './AlertsTable';
import { Chart } from 'react-chartjs-2';

const Dashboard = () => {
    // Parse the data
    const data = rawData;
    console.log(data);

    // Prepare data for charts
    
    const severityCounts = data.reduce((acc, alert) => {
        if(alert.alert.severity){
        acc[alert.alert?.severity] = (acc[alert.alert?.severity] || 0) + 1;
        return acc;
        }
    }, {});

    const chartData = {
        labels: Object.keys(severityCounts),
        datasets: [
            {
                label: 'Severity Count',
                data: Object.values(severityCounts),
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h1>Security Dashboard</h1>
            <div>
                <h2>Alerts Table</h2>
                <AlertsTable data={data} />
            </div>
            <div>
                <h2>Severity Chart</h2>
                <Chart type="bar" data={chartData} />
            </div>
        </div>
    );
};

export default Dashboard;
