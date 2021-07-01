import {React} from 'react'
import MaterialTable from 'material-table'

const degree = '\xB0 F'
const myCustomSortingAlgorithm = {
    ascending: (a, b) => (a.entryTimeDateObject > b.entryTimeDateObject) ? 1 : -1,
    descending: (a, b) => (a.entryTimeDateObject < b.entryTimeDateObject) ? 1 : -1
}
const spo2UpperBound = 95
const spo2LowerBound = 90
  
export default function DaywiseData(props) {
    const {rows} = props
    const _spo2Color = spo2Value => {
        if (spo2Value >= spo2UpperBound) return 'white';
        if (spo2Value >= spo2LowerBound) return 'orange';
        return 'red';
    }

    return (
        <MaterialTable
            title="DateWise Data"
            columns={
            [
                {
                    title: 'Entry Date',
                    field: 'entryTimeDateObject',
                    type: "date",
                    dateSetting: {
                        format: 'dd/MM/yyyy',
                        locale: "en-GB",
                },
                },
                {
                    title: 'Entry Time',
                    field: 'entryTimeString',
                    filtering: false,
                },
                {
                    title: 'Temperature ' + degree,
                    field: 'temperature',
                    type: "numeric",
                    filtering: false,
                    // customFilterAndSearch: (term, rowData) => term >= rowData.temperature,
                },
                {
                    title: 'SpO2 %',
                    field: 'spo2',
                    type: "numeric",
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
            ]}

            data={rows.sort(myCustomSortingAlgorithm.descending)}

            options={{ 
                search: false,
                filtering: true,
                exportButton: true,
                exportAllData: true,
                headerStyle: {
                    fontSize: 20,
                    // fontFamily: "Times New Roman"
                },
                rowStyle: {
                    fontSize: 19
                },
                sorting: true
            }}

        />
    )
}