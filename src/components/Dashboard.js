import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Button from "@material-ui/core/Button"
import { Redirect } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Footer from './Footer'
import date from 'date-and-time'

const degree = '\xB0'
const spo2UpperBound = 95
const spo2LowerBound = 90

const myCustomSortingAlgorithm = {
  ascending: (a, b) => a.spo2 - b.spo2,
  descending: (a, b) => b.spo2 - a.spo2
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#00C9BC",
    flexGrow: 1,
    borderRadius: 6
  },
  menuButton: {
    marginRight: 2,
    fontSize: 18,
    fontFamily: "Comic sans ms",
    backgroundColor: "#E0FFFF",
    '&:hover': {
      backgroundColor: "#FFFDD0",
    }
  },
  title: {
    flexGrow: 1,
    fontSize: 25,
    fontWeight: "bold"
  },
})

const Dashboard = props => {

  let loggedIn = false
  const token = localStorage.getItem("token")
  if (token) loggedIn = true
  const classes = useStyles();
  const [state, setState] = useState({
    loggedIn: loggedIn,
    rows: [], // rows will be a list of PATIENT OBJECT
    fetchError: false,
  })

  const logout = () => {
    setState({
      loggedIn: false
    })
  }

  useEffect(() => {
    const getData = async() => {
      // console.log("Making a request!")
      const url = "https://imedixbcr.iitkgp.ac.in/api/coviapp/get-all-patients";
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      axios.get(
        url,
        config
      ).then(response => response.data)
        .then((data) => {
          const patientList = data.data;
          // console.log(patientList);
          /*

            Response structure:

            dateofbirth: "05-06-1980"
            ec_rollno: "112233"
            entrytime: "2021-06-14T14:26:44.000+00:00"
            fever: 102
            food_supply: "no"
            hall: "RK"
            have_covid: "yes"
            isolation_address: "nehru"
            isolation_date: "2021-06-08T18:30:00.000+00:00"
            name: "coviapp demo1"
            parent_mobileno: "1234567890"
            pat_id: "BCRT0192805210000"
            patient_condition: "body-ache, headache, yes"
            phone: "1123455678"
            pulse_rate: 102
            selected_category: "B.Tech (regular/DD)"
            spo2: 90
            supervisor_mobileno: "1234567890"
            supervisor_name: "abcd"
            symptoms: "cough"

          */
          setState({ rows: patientList.sort(myCustomSortingAlgorithm.ascending) })
        })
        .catch((error) => {
          console.log('token is expired logging in again for getting jwt');
          axios.post("https://imedixbcr.iitkgp.ac.in/api/user/login", {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password")
          }).then(res => {
            const newJwtToken = res.data['jwtToken']
            localStorage.setItem("token", newJwtToken)

            const url = "https://imedixbcr.iitkgp.ac.in/api/coviapp/get-all-patients";
            const token = localStorage.getItem("token");
            const config = {
              headers: { Authorization: `Bearer ${token}` }
            };
            axios.get(
              url,
              config
            ).then(response => response.data)
              .then((data) => {
                const patientList = data.data;
                // console.log(data.data)
                setState({ rows: patientList.sort(myCustomSortingAlgorithm.ascending) })
              })
              .catch((error) => {
                console.log('error in fetching get-all-patients');
                setState({ fetchError: true })
                // console.log(error.message)
              })
            }).catch(error => {
              console.log('error in logging in again from local-storage credentials');
            setState({ fetchError: true })
            // console.log(error.message)
          })
        })
      }
      
      getData()
      const interval = setInterval(() => {
        getData()
      }, 20000)
      return () => clearInterval(interval)
  }, [])

  const _spo2Color = spo2Value => {
    if (spo2Value >= spo2UpperBound) return 'white';
    if (spo2Value >= spo2LowerBound) return 'orange';
    return 'red';
  }

  if (state.loggedIn === false) {
    return <Redirect to="/logout" />
  }

  function ErrorDialog() {
    if (state.fetchError) {
      return <React.Fragment>
        <div className={classes.root}>
          <AppBar position="static" style={{ background: '#ffe6e6' }} className={classes.root}>
            <Toolbar>
              <Typography color="error" variant="h6" className={classes.title}>
                Some error occured. Please Logout
            </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </React.Fragment>;
    }
    return <></>;
  }

  let content = (
    <React.Fragment>
      < ErrorDialog />
      
      <div className={classes.root}>
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Welcome
            </Typography>
            <Button className={classes.menuButton} onClick={logout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>

      <MaterialTable
        title="CoviApp Dashboard"
        columns={
          [
            {
              title: 'Name',
              field: 'name'
            },
            {
              title: 'Category',
              field: 'selected_category',
              // lookup: { 1: 'Student', 2: 'Faculty', 3: 'Staff' },
            },
            {
              title: 'Roll No/EC ',
              field: 'ec_rollno'
            },
            {
              title: 'Location',
              field: 'isolation_address'
            },
            {
              title: 'Temperature ' + degree + 'F',
              field: 'fever',
              type: "numeric",
              filtering: false,
              // customFilterAndSearch: (term, rowData) => term >= rowData.temperature,
            },
            {
              title: 'SpO2 %',
              field: 'spo2',
              type: "numeric",
              customSort: (a, b) => a.spo2 - b.spo2,
              filtering: false,
              // customFilterAndSearch: (term, rowData) => term >= rowData.spo2,
              cellStyle: columnData => ({
                backgroundColor: _spo2Color(columnData),
              }),

            },
            {
              title: 'Pulse Rate',
              field: 'pulse_rate',
              type: "numeric",
              filtering: false,
              // customFilterAndSearch: (term, rowData) => term >= rowData.pulse,
            },
            // {
            //   title: 'Respiratory Rate',
            //   field: 'resp',
            //   type: "numeric",
            //   filtering: false,
            //   // customFilterAndSearch: (term, rowData) => term >= rowData.resp,
            // },
            {
              title: 'Covid positive',
              field: 'have_covid',
              // filtering: false,
              // lookup: { 0: 'No', 1: 'Yes', },
            },
            {
              title: 'Condition',
              field: 'patient_condition',
              filtering: false,
            },
            {
              title: 'Last Updated',
              field: 'entrytime',
              render: columnData => {
                const chkDate = new Date(columnData['entrytime'])
                return date.format(chkDate, 'HH:MM DD/MM/YY')
              }
            },
          ]}

        data={state.rows}
        options={{
          filtering: true,
          exportButton: true,
          exportAllData: true,
          pageSize: 10,
          search: true,
          sorting: true,
          actionsColumnIndex: 1,
          headerStyle: {
            fontSize: 20,
            // fontFamily: "Times New Roman"
          },
          rowStyle: {
            fontSize: 19
          }

        }}

        actions={[
          rowData => ({
            icon: ArrowForwardIcon,
            tooltip: 'Click to monitor',
            onClick: () => {
              props.history.push({
                pathname: `../graphs/${rowData.ec_rollno}`,
                state: rowData
              })
            }
          })
        ]}
      />
      
      <Footer/>
    </React.Fragment>
  )
  return content
}

export default Dashboard