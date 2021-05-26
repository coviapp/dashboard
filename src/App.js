import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'

class App extends Component {
  render() {
    return (
      <MaterialTable
        title="CoviApp Dashboard"
        columns={[
          { title: 'Name2', field: 'name' },
          { title: 'Roll No/EC Code', field: 'username' },
          { title: 'Location', field: 'location'},
          {
            title: 'Category',
            field: 'patientCategory',
            lookup: { 1: 'Student', 2: 'Faculty',3: 'Staff' },
          },
        ]}
        data={[
          { name: 'Aryan', username: '19CS30005', location: 'RP', patientCategory: 1 },
          { name: 'Prof. Abhinandan', username: '123', location: '2017', patientCategory: 2 },
        ]}
        options={{
          filtering: true,
          exportButton: true,

        }}
      />
    )
  }
}

export default App;