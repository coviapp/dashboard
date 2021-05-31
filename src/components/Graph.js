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
    flexDirection: 'column'
  },
  indivgraph: {
    // responsive: true,
    width: "90vw",
    maxWidth: 1200,
    alignSelf: "center"
  },
  sep: {
    marginTop: 40,
    marginBottom: 40
  }
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
  console.log(window.innerWidth)
    
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
                plugins: {
                  title: {
                    display: true,
                    text: 'Temperature v/s time',
                    font: {
                      size: 20
                    }
                  }
                },
                scales: {
                    y:{
                      ticks: {
                        callback: function(value) {
                          return value + '\xB0' + " F";
                        },
                      }  
                    }
                }    
            }}
          />
        </div>

        <div className={classes.sep}>
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
                plugins: {
                  title: {
                    display: true,
                    text: 'SpO2 v/s time',
                    font: {
                      size: 20
                    }
                  }
                },
                scales: {
                    x:{
                        beginAtZero: false
                    }
                },
            }}
          />
        </div>

        <div className={classes.sep}>
        </div>
        
      </div>
      </Fragment>
  );

  return content
}

export default Graph