import { React, useState, Fragment } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: "#00C9BC",
  },
});

const Graph = (props) => {

  let loggedIn = false
  const classes = useStyles()

  const token = localStorage.getItem("token")
  if (token) loggedIn = true
  // Todo: Verify the token
  
  const [state, setState] = useState({
      loggedIn: loggedIn,
  })
    
  if (state.loggedIn === false) {
    return <Redirect to="/logout" />
  }

  const myUsername = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  console.log("Plotted graph for " + myUsername)
    
  let content = (
    <Fragment>
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
      </Fragment>
  );

  return content
}

export default Graph