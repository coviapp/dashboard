import { React, useState, Fragment, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import StudentData from './StudentData'
import axios from 'axios'
import date from 'date-and-time'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MaterialTable from 'material-table'
import Footer from './Footer'

const degree = '\xB0'
const spo2UpperBound = 95
const spo2LowerBound = 90

const useStyles = makeStyles({
  appbar: {
    backgroundColor: "#00C9BC",
    borderRadius: 6,
    fontWeight: "bold",
  },
  root: {
    backgroundColor: "#00C9BC",
  },
  title: {
    flexGrow: 1,
    fontSize: 25,
    fontWeight: "bold"
  },
  graph: {
    display: 'flex',
    flexDirection: 'column'
  },
  indivgraph: {
    width: "90vw",
    maxWidth: 1200,
    alignSelf: "center"
  },
  sep: {
    marginTop: 40,
    marginBottom: 40
  },
  newtable: {
    display: "flex",
    flexDirection: "column"
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
    entryTime: [],
    entryTimeDateObject: [],
    spo2Data: [],
    tempData: [],
    rows: [],
  })

  useEffect(() => {

    const getPatientData = async () => {
      const url = "https://imedixbcr.iitkgp.ac.in/api/coviapp/get-patient-data";
      const token = localStorage.getItem("token");
      const patientId = props.location.state['pat_id']

      const bodyParams = {
        patid: patientId
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const res = await axios.post(url, bodyParams, config)
        const vals = res.data.data
        // console.log(vals)
        var _entryTime = vals.map((entry) => {
          const entryDate = new Date(entry['entrytime'])
          return date.format(entryDate, 'HH:MM DD MMM')
        });
        var _entryTimeDateObject = vals.map((entry) => {
          return new Date(entry['entrytime'])
        });
        var _spo2Data = vals.map((entry) => entry['spo2']);
        var _tempData = vals.map((entry) => entry['fever']);

        var _rows=[]
        for (let i = 0; i < Math.min(_tempData.length, _spo2Data.length, _entryTimeDateObject.length); i++) {
          let dict = {};
          dict['temperature'] = _tempData[i];
          dict['spo2'] = _spo2Data[i];
          dict['entryTimeDateObject'] = _entryTimeDateObject[i];
          dict['entryTimeString'] = date.format(_entryTimeDateObject[i],'HH:MM:SS');
          _rows.push(dict);
        }

        setState({
          entryTime: _entryTime,
          entryTimeDateObject: _entryTimeDateObject,
          spo2Data: _spo2Data,
          tempData: _tempData,
          rows: _rows,
        })

      } catch (error) {
        console.log("Logging in again!")
        try {
          const retry = await axios.post("https://imedixbcr.iitkgp.ac.in/api/user/login", {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password")
          })
          const newJwt = retry.data['jwtToken']
          localStorage.setItem("token", newJwt)
        } catch (error) {
          console.log("Caught an error in re login!")
          console.log(error)
        }
        getPatientData()
      }
    }
    getPatientData()
  }, [props.location.state])

  if (state.loggedIn === false) {
    return <Redirect to="/logout" />
  }

  const _spo2Color = spo2Value => {
    if (spo2Value >= spo2UpperBound) return 'white';
    if (spo2Value >= spo2LowerBound) return 'orange';
    return 'red';
  }

  let content = (
    <Fragment>

      <div className={classes.appbar}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Currently monitoring {props.location.state['name']}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <div className={classes.sep}>
      </div>

      <div className={classes.newtable}>
        <StudentData className={classes.table} data={props.location.state} />
      </div>

      <div className={classes.sep}>
      </div>

      <div className={classes.graph}>
        <div className={classes.indivgraph}>
          <Line
            data={{
              labels: state.entryTime,
              datasets: [
                {
                  label: 'Temperature',
                  data: state.tempData,
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
                y: {
                  ticks: {
                    callback: function (value) {
                      return `value${degree} F`
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
            data={{
              labels: state.entryTime,
              datasets: [
                {
                  label: 'SpO2',
                  data: state.spo2Data,
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
                x: {
                  beginAtZero: false
                }
              },
            }}
          />
        </div>

        <div className={classes.sep}>
        </div>

      </div>
      
      <MaterialTable
        title="DateWise Data"
        columns={
          [
            {
              title: 'Temperature ' + degree + 'F',
              field: 'temperature',
              type: "numeric",
              customFilterAndSearch: (term, rowData) => term >= rowData.temperature,
            },
            {
              title: 'SpO2 %',
              field: 'spo2',
              type: "numeric",
              customFilterAndSearch: (term, rowData) => term >= rowData.spo2,
              cellStyle: columnData => ({
                backgroundColor: _spo2Color(columnData),
              }),

            },
            {
              title: 'Entry Date',
              field: 'entryTimeDateObject',
              type: "date",
              dateSetting: {
                format: 'dd/MM/yyyy',
                locale: "en-GB",
              },
            },
            {
              title: 'Entry Time',
              field: 'entryTimeString',
              filtering: false,
            },
          ]}

        data={state.rows}

        options={{ 
          search: false,
          filtering: true,
          exportButton: true,
          exportAllData: true,
        }}

      />

      <Footer></Footer>
    </Fragment>
  );

  return content
}

export default Graph