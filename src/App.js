import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import SearchIcon from '@material-ui/icons/Search';

const degreeFahrenheit = String.fromCharCode(parseInt("2109", 16));


class App extends Component {
  render() {
    return (
      <MaterialTable
        title="CoviApp Dashboard"
        columns={[
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
            title: 'SpO2',
            field: 'spo2'
          },
          {
            title: 'Condition',
            field: 'condition'
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
          { name: 'Aryan', username: '1', location: 'RP', patientCategory: 1, temperature: 48 },
          { name: 'Aryan', username: '2', location: 'RP', patientCategory: 1, temperature: 49 },
          { name: 'Aryan', username: '3', location: 'RP', patientCategory: 1, temperature: 8 },
          { name: 'Aryan', username: '4', location: 'RP', patientCategory: 1, temperature: 485 },
          { name: 'Aryan', username: '5', location: 'RP', patientCategory: 1, temperature: 48 },
          { name: 'Aryan', username: '6', location: 'RP', patientCategory: 1, temperature: 88 },
          { name: 'Aryan', username: '7', location: 'RP', patientCategory: 1, temperature: 78 },
          { name: 'Aryan', username: '8', location: 'RP', patientCategory: 1, temperature: -10 },
          { name: 'Prof. Abhinandan', username: '123', location: 'RK', patientCategory: 2 },
        ]}
        options={{
          filtering: true,
          exportButton: true,
          pageSize: 10,
        }}
        icons={{
          Search: SearchIcon,
          Filter: SearchIcon,
        }}
      />
    )
  }
}

export default App;