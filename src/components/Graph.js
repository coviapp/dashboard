import React from 'react'
import { Bar, Line } from 'react-chartjs-2'

class Graph extends React.Component {

  render() {
    const myUsername = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    console.log("Plotted graph for " + myUsername)
    return (
      <React.Fragment>
        <h2 id="header">
            Displaying information for user { myUsername }
            <br/>
            Todo: Display other info!
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
  
        <br/>
        <br/>
  
        <Bar
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
  
          height={200}
          
          options= {{
            scales: {
              y:{
                beginAtZero: false
              }
            }
          }}
  
          />
        </React.Fragment>
    );
  }
}

export default Graph