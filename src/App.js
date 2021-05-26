import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import axios from 'axios';

// import BarChart from './components/BarChart'
// import LineChart from './components/LineChart'

const degree = String.fromCharCode(parseInt("00B0", 16));
const spo2UpperBound=95;
const spo2LowerBound=90;

class App extends Component {

  state = {
    rows: [], // rows will be a list of PATIENT OBJECT

    /*
      PATIENT OBJECT SCHEMA

      "name": String,
      "location": String,
      "temperature": int,
      "spo2": int, // should be between 0-100 as it is %
      "status": bool, // wether discharged from isolation or not
      "condition": String,
      "patientCategory": int, // only {1,2,3} // { 1: 'Student', 2: 'Faculty', 3: 'Staff' }
    */

  }

  componentDidMount() {
    const url = "https://aryan57.github.io/json_dumps/data.json";
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ rows: data.jsonUserData })
     })

  }

  render() {
    return (
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
        }}
      />
    )
  }

  _spo2Color(spo2Value) {
    if (spo2Value >= spo2UpperBound) return 'white';
    if (spo2Value >= spo2LowerBound) return 'orange';
    return 'red';
  }
}

export default App;