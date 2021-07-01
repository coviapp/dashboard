import { React, useState, Fragment, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import StudentData from './StudentData'
import LineGraph from './LineGraph'
import DaywiseData from './DaywiseData'
import Appbar from './Appbar'
import axios from 'axios'
import date from 'date-and-time'
import Footer from './Footer'

const degree = '\xB0 F'
const temperatureGraph = {
  unit: degree,
  title: "Temperature"
}
const SpO2Graph = {
  unit: ' ',
  title: "SpO2"
}
const PulseRateGraph = {
  unit: ' ',
  title: "Pulse Rate"
}
const useStyles = makeStyles({
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
    flexDirection: 'column',
  },
  indivgraph: {
    width: "90vw",
    maxWidth: 1200,
    alignSelf: "center",
    marginBottom: 75
  },
  newtable: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 100,
    marginTop: 80
  },
});

export default function Graph(props) {

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
    pulseData: [],
    rows: [],
  })

  const formatTime = (entryTime) => {
    return date.format(new Date(entryTime), 'HH:MM:SS')
  }

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

        const _entryTime = vals.map((entry) => {
          const entryDate = new Date(entry['entrytime'])
          return date.format(entryDate, 'HH:MM DD MMM')
        })

        const _entryTimeDateObject = vals.map((entry) => {
          return new Date(entry['entrytime'])
        })

        const _spo2Data = vals.map((entry) => entry['spo2'])
        const _tempData = vals.map((entry) => entry['fever'])
        const _pulseRate = vals.map((entry) => entry['pulse_rate'])

        const _rows = vals.map(entry => (
          {
            temperature: entry['fever'],
            spo2: entry['spo2'],
            entryTimeDateObject: entry['entrytime'],
            entryTimeString: formatTime(entry['entrytime']),
            pulse_rate: entry['pulse_rate']
          }
        ))

        setState({
          entryTime: _entryTime,
          entryTimeDateObject: _entryTimeDateObject,
          spo2Data: _spo2Data,
          tempData: _tempData,
          rows: _rows,
          pulseData: _pulseRate
        })

      } catch (error) {
        // console.log("Logging in again!")
        try {
          const retry = await axios.post("https://imedixbcr.iitkgp.ac.in/api/user/login", {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password")
          })
          const newJwt = retry.data['jwtToken']
          localStorage.setItem("token", newJwt)
        } catch (error) {
          console.error("Caught an error in re login!")
          console.error(error)
        }
        getPatientData()
      }
    }
    getPatientData()
  }, [props.location.state])

  if (state.loggedIn === false) {
    return <Redirect to="/logout" />
  }

  let content = (
    <Fragment>

      <div className={classes.appbar}>
        <Appbar covid={props.location.state["have_covid"]} name={props.location.state['name']}/>
      </div>

      <div className={classes.newtable}>
        <StudentData data={props.location.state} />
      </div>

      <div className={classes.graph}>
          <div className={classes.indivgraph}>
            <LineGraph timeStamps={state.entryTime} dataPoints={state.tempData} graphType={temperatureGraph}/>
          </div>

          <div className={classes.indivgraph}>
            <LineGraph timeStamps={state.entryTime} dataPoints={state.spo2Data} graphType={SpO2Graph}/>
          </div>

          <div className={classes.indivgraph}>
            <LineGraph timeStamps={state.entryTime} dataPoints={state.pulseData} graphType={PulseRateGraph}/>
          </div>

          <div className={classes.indivgraph}>
            <DaywiseData rows={state.rows}/>
          </div>
      </div>

      <Footer/>

    </Fragment>
  )

  return content
}