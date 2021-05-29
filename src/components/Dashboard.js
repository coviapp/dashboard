import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios';

// Importing Icons
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const degree = String.fromCharCode(parseInt("00B0", 16));
const spo2UpperBound=95;
const spo2LowerBound=90;
 
const useStyles = makeStyles({
  root: {
    backgroundColor: "#00C9BC",
    flexGrow: 1,
    borderRadius: 6
  },
  menuButton: {
    marginRight: 2,
  },
  title: {
    flexGrow: 1,
  },
});

const Dashboard = props => {
  
  let loggedIn = false
  
  const token = localStorage.getItem("token")
  if (token) loggedIn = true
  // Todo: verify token
  
  const classes = useStyles();
  
  const [state, setState] = useState({
      loggedIn: loggedIn,
      rows: [], // rows will be a list of PATIENT OBJECT
  })

  const logout = () => {
    setState({
        loggedIn: false
    })
    // console.log(state);
  }

  useEffect(() => {
    const url = "https://aryan57.github.io/json_dumps/data.json";
    axios.get(url).then(response => response.data)
    .then((data) => {
      setState({ rows: data.jsonUserData })
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

  let content = (
    <React.Fragment> 
      <div className={classes.root}>
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Welcome
            </Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
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
              title: 'Roll No/EC Code',
              field: 'username'
            },
            {
              title: 'Location',
              field: 'location'
            },
            {
              title: 'Temperature '+degree+'F',
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
              title: 'Discharged from Isolation',
              field: 'status',
              lookup: {0:'No',1:'Yes',},
            },
            {
              title: 'Condition',
              field: 'condition',
              filtering: false,
            },
            {
              title: 'Category',
              field: 'patientCategory',
              lookup: { 1: 'Student', 2: 'Faculty', 3: 'Staff' },
            },
          ]}

        data = {state.rows}
        options={{
          filtering: true,
          exportButton: true,
          exportAllData: true,
          pageSize: 10,
          search: true,
          actionsColumnIndex: 1,
        }}

        actions={[
          rowData => ({
            icon: ArrowForwardIcon,
            tooltip: 'Click to monitor',
            onClick: () => {
              props.history.push(`../graphs/${rowData.username}`)
            }
          })
        ]}
      />
    </React.Fragment>
  )
  return content
}

export default Dashboard