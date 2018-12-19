import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ chartLabels, chartData }) => {

    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Statistics',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: chartData,
            }
        ]
    };

    return (
        <Line
            data={data}
            width={80}
            height={50}
            options={{
                maintainAspectRatio: true
            }}
        />
    );
};

export default Chart;