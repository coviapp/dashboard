import React from 'react'
import { Line } from 'react-chartjs-2'

const LineChart = () => {
    return (
        <div>
            <h2 id="header">
                Displaying information for Mr X
                <br/>
                Todo: Add other details!
            </h2>   
            <br/>
            <Line
                data = {{
                    labels: ['9:00', '12:00', '15:00', '18:00', '21:00',],
                    datasets: [
                        {
                            label: 'Temperature v/s time',
                            data: [98, 100, 99, 102, 98],
                            backgroundColor: 'rgba(0, 0, 255, 0.3)',
                            borderColor: 'rgba(0, 0, 255, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'SpO2 v/s time',
                            data: [94, 98, 81, 87, 92],
                            backgroundColor: 'rgba(255, 0, 0, 0.3)',
                            borderColor: 'rgba(255, 0, 0, 1)',
                            borderWidth: 1
                        }
                    ] 
                }}

                options={{
                    scales: {
                        x:{
                            beginAtZero: false
                        }
                    }
                }}

            />
        </div>
    )
}

export default LineChart