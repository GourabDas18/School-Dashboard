import { Line } from "react-chartjs-2";
import 'chart.js/auto'


type dataset ={
    label:string,
    data : number[],
    backgroundColor: any,
    borderColor:string,
    borderWidth: number,
    fill:boolean,
    tension:number,
    
}

type dataType = {
    labels: string[],
    datasets: dataset[]
}

type AreaDataType = {
    data: dataType;
    min: number;
    max: number
}
export const AreaChart = ({data,min,max}:AreaDataType)=>{ 
    return (
        <Line
        data={data}
        options= {{
            scales: {
              y: {
                suggestedMin: min,
                suggestedMax: max,
                beginAtZero:false
              },
            },
            responsive: true,
     maintainAspectRatio: false,
            //   aspectRatio : 2
          }}
        >

        </Line>
    )
}