import React, { Component } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios';

// Importing Icons
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router-dom"


const degree = String.fromCharCode(parseInt("00B0", 16));
const spo2UpperBound=95;
const spo2LowerBound=90;

class Dashboard extends Component {

  constructor() {
    super()
    let loggedIn = false

    const token = localStorage.getItem("token")
    if (token) loggedIn = true
    // Todo: verify token
    
    this.logout = this.logout.bind(this)
    
    this.state = {
        loggedIn,
        rows: [], // rows will be a list of PATIENT OBJECT
    }
  }

  logout() {
    this.setState({
        loggedIn: false
    })
    // console.log(this.state);
  }

  componentDidMount() {
    const url = "https://aryan57.github.io/json_dumps/data.json";
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ rows: data.jsonUserData })
     })

  }

  render() {
    
    if (this.state.loggedIn === false) {
      return <Redirect to="/logout" />
    }

    return (
      <React.Fragment>
        <Grid container justify="flex-end">
          <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.logout}
          >
              Sign Out
          </Button>
        </Grid>

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
                  backgroundColor: this._spo2Color(columnData),
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

          data = {this.state.rows}
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
                this.props.history.push(`../graphs/${rowData.username}`)
              }
            })
          ]}
        />
      </React.Fragment>
    )
  }

  _spo2Color(spo2Value) {
    if (spo2Value >= spo2UpperBound) return 'white';
    if (spo2Value >= spo2LowerBound) return 'orange';
    return 'red';
  }
}

export default Dashboard