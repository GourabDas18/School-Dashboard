import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Title,
    Legend
} from "chart.js";

ChartJs.register({
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Title,
    Legend
})

type dataSet = {
    label: string,
    data: number[],
    backgroundColor: string,
    borderRadius: number,
    borderWidth: number,
    borderColor: string
}

type BarChartdata = {
    labels:string[],
    datasets: dataSet[]
}
interface BarChartType {
    data: BarChartdata,
    min: number,
    max: number
}

export const BarChart = ({data,max,min}:BarChartType)=>{
    return(
        <Bar
        options={{
            responsive : true,
            maintainAspectRatio: false,
            scales: {
                y: {
                  suggestedMin: min,
                  suggestedMax: max,
                  beginAtZero:false
                },
              },
        }}
        data={data}
        
        >

        </Bar>
    )
}