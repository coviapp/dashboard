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

const degree = '\xB0'
const spo2UpperBound = 95
const spo2LowerBound = 90

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
        console.log(data.data)
        setState({ rows: patientList })
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
              console.log(data.data)
              setState({ rows: patientList })
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
              title: 'Discharged from Isolation',
              field: 'status',
              lookup: { 0: 'No', 1: 'Yes', },
            },
            {
              title: 'Condition',
              field: 'patient_condition',
              filtering: false,
            },
          ]}

        data={state.rows}
        options={{
          filtering: true,
          exportButton: true,
          exportAllData: true,
          pageSize: 10,
          search: true,
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
    </React.Fragment>
  )
  return content
}

export default Dashboard