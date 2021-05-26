import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import axios from 'axios';

// Importing Icons
import { forwardRef } from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import SearchIcon from '@material-ui/icons/Search';

import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
// todo: figure out a way to route

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  // Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <SearchIcon {...props} ref={ref} />),
};

const myData = [
  { name: 'Aryan', username: '1', location: 'RP', status:0 ,patientCategory: 1, spo2: 78, temperature: 48 },
  { name: 'Aryan', username: '2', location: 'RP', status:0 ,patientCategory: 1, spo2: 75, temperature: 49 },
  { name: 'Aryan', username: '3', location: 'RP', status:0 ,patientCategory: 1, spo2: 92, temperature: 8 },
  { name: 'Aryan', username: '4', location: 'RP', status:0 ,patientCategory: 1, spo2: 78, temperature: 485 },
  { name: 'Aryan', username: '5', location: 'RP', status:0 ,patientCategory: 1, spo2: 96, temperature: 48 },
  { name: 'Aryan', username: '6', location: 'RP', status:0 ,patientCategory: 1, spo2: 78, temperature: 88 },
  { name: 'Aryan', username: '7', location: 'RP', status:0 ,patientCategory: 1, spo2: 92, temperature: 78 },
  { name: 'Aryan', username: '8', location: 'RP', status:0 ,patientCategory: 1, spo2: 94, temperature: -10 },
  { name: 'Aryan', username: '1', location: 'RP', status:0 ,patientCategory: 1, spo2: 78, temperature: 48 },
  { name: 'Aryan', username: '2', location: 'RP', status:1 ,patientCategory: 1, spo2: 100, temperature: 49 },
  { name: 'Aryan', username: '3', location: 'RP', status:1 ,patientCategory: 1, spo2: 99, temperature: 8 },
  { name: 'Aryan', username: '4', location: 'RP', status:1 ,patientCategory: 1, spo2: 88, temperature: 485 },
  { name: 'Aryan', username: '5', location: 'RP', status:1 ,patientCategory: 1, spo2: 93, temperature: 48 },
  { name: 'Aryan', username: '6', location: 'RP', status:1 ,patientCategory: 1, spo2: 91, temperature: 88 },
  { name: 'Aryan', username: '7', location: 'RP', status:1 ,patientCategory: 1, spo2: 78, temperature: 78 },
  { name: 'Aryan', username: '8', location: 'RP', status:1 ,patientCategory: 1, spo2: 91, temperature: -10 },
  { name: 'Prof. Abhinandan', username: '123', location: 'RK', patientCategory: 2, spo2: 708, temperature: -10 },
];

// Todo: read from json!

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

        actions={[
          rowData => ({
            icon: () => <BrowserRouter to={"#"}><h6>Display!</h6></BrowserRouter>,
            tooltip: 'Open profile',
            onlick: (rowData)
          })
        ]}
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