import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'

// Importing Icons
import { forwardRef } from 'react';
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

// degree Fahrenheit from hex unicode
const degreeFahrenheit = String.fromCharCode(parseInt("2109", 16));
const spo2UpperBound=95;
const spo2LowerBound=90;

class App extends Component {
  render() {
    return (
      <MaterialTable
        icons={tableIcons}
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
              title: 'Temperature ' + degreeFahrenheit,
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
              title: 'Condition',
              field: 'condition',
            },
            {
              title: 'Status(Discharged from isolation)',
              field: 'status'
            },
            {
              title: 'Category',
              field: 'patientCategory',
              lookup: { 1: 'Student', 2: 'Faculty', 3: 'Staff' },
            },
          ]}

        data={[
          { name: 'Aryan', username: '1', location: 'RP', patientCategory: 1, spo2: 78, temperature: 48 },
          { name: 'Aryan', username: '2', location: 'RP', patientCategory: 1, spo2: 78, temperature: 49 },
          { name: 'Aryan', username: '3', location: 'RP', patientCategory: 1, spo2: 78, temperature: 8 },
          { name: 'Aryan', username: '4', location: 'RP', patientCategory: 1, spo2: 78, temperature: 485 },
          { name: 'Aryan', username: '5', location: 'RP', patientCategory: 1, spo2: 78, temperature: 48 },
          { name: 'Aryan', username: '6', location: 'RP', patientCategory: 1, spo2: 78, temperature: 88 },
          { name: 'Aryan', username: '7', location: 'RP', patientCategory: 1, spo2: 92, temperature: 78 },
          { name: 'Aryan', username: '8', location: 'RP', patientCategory: 1, spo2: 78, temperature: -10 },
          { name: 'Aryan', username: '1', location: 'RP', patientCategory: 1, spo2: 78, temperature: 48 },
          { name: 'Aryan', username: '2', location: 'RP', patientCategory: 1, spo2: 100, temperature: 49 },
          { name: 'Aryan', username: '3', location: 'RP', patientCategory: 1, spo2: 78, temperature: 8 },
          { name: 'Aryan', username: '4', location: 'RP', patientCategory: 1, spo2: 78, temperature: 485 },
          { name: 'Aryan', username: '5', location: 'RP', patientCategory: 1, spo2: 78, temperature: 48 },
          { name: 'Aryan', username: '6', location: 'RP', patientCategory: 1, spo2: 78, temperature: 88 },
          { name: 'Aryan', username: '7', location: 'RP', patientCategory: 1, spo2: 78, temperature: 78 },
          { name: 'Aryan', username: '8', location: 'RP', patientCategory: 1, spo2: 78, temperature: -10 },
          { name: 'Prof. Abhinandan', username: '123', location: 'RK', patientCategory: 2, spo2: 708, temperature: -10 },
        ]}
        options={{
          filtering: true,
          exportButton: true,
          exportAllData: true,
          pageSize: 10,
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