import {React} from "react"
import { Line } from 'react-chartjs-2'


export default function LineGraph(props) {
    const {timeStamps, dataPoints, graphType} = props
    return(
        <Line
            data={{
              labels: timeStamps,
              datasets: [
                {
                  label: graphType["title"],
                  data: dataPoints,
                  backgroundColor: 'rgba(0, 0, 255, 0.3)',
                  borderColor: 'rgba(0, 0, 255, 1)',
                  borderWidth: 1
                }
              ]
            }}

            options={{
              plugins: {
                title: {
                  display: true,
                  text: graphType["title"] + ' v/s time',
                  font: {
                    size: 20
                  }
                }
              },
              scales: {
                y: {
                  ticks: {
                    callback: function (value) {
                      return `${value}${graphType["unit"]}`
                    },
                  }
                }
              }
            }}
          />
    )
}