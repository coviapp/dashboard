import { React, useState, Fragment } from 'react'
import { Line } from 'react-chartjs-2'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { findByLabelText } from '@testing-library/dom';
import { Title } from 'chart.js';

const useStyles = makeStyles({
  root: {
    backgroundColor: "#00C9BC",
    margin: 10
  },
  graph: {
    display: 'flex',
    flexDirection: 'row'
  },
  indivgraph: {
    width: "47.5vw",
    marginLeft: 10,
    marginRight: 10,
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

      <div className={classes.graph}>
        <div className={classes.indivgraph}>
          <Line
            data = {{
                labels: ['9:00', '12:00', '15:00', '18:00', '21:00',],
                datasets: [
                    {
                        label: 'Temperature',
                        data: [98, 100, 99, 102, 98],
                        backgroundColor: 'rgba(0, 0, 255, 0.3)',
                        borderColor: 'rgba(0, 0, 255, 1)',
                        borderWidth: 1
                    }
                ] 
            }}

            options={{
                responsive: true,
                scales: {
                    y:{
                        ticks: {
                            callback: function(value, index, values) {return value + '\xB0' + " F";},
                        },
                        
                    }
                },
                
            }}
          />
        </div>

        <div className={classes.indivgraph}>
          <Line
            data = {{
                labels: ['9:00', '12:00', '15:00', '18:00', '21:00',],
                datasets: [
                    {
                        label: 'SpO2',
                        data: [94, 98, 81, 87, 92],
                        backgroundColor: 'rgba(255, 0, 0, 0.3)',
                        borderColor: 'rgba(255, 0, 0, 1)',
                        borderWidth: 1
                    }
                ] 
            }}

            options={{
                responsive: true,
                scales: {
                    x:{
                        beginAtZero: false
                    }
                },
                
            }}
          />
        </div>
      </div>
      </Fragment>
  );

  return content
}

export default Graph