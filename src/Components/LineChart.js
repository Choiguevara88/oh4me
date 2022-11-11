import React, {useState} from 'react';
import Chart from 'react-apexcharts';

const LineChart = ({data}) => {
    const [options, setOptions] = useState({
        chart : {
            id : "line-chart",
            toolbar: {
                show: false
              },
        },
        xaxis : {
            categories : [0,1,2,3,4,5,6,7,8,9]
        },
        yaxis : {
            show : false,
        },
        stroke : {
            width: 3,
            curve: 'smooth',
            lineCap: 'butt',
        },
        fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              gradientToColors: ['#ff4d61','#FDD835'],
              shadeIntensity: 1,
              type: 'horizontal',
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100, 100, 0]
            },
          },
        tooltip: {
            enabled: false,
        },

        
    })
    const [series, setSeries] = useState([{
        name: '인생주기율',
        data:data
    }])
    return (
        <Chart 
            options={options}
            series={series}
            width={"100%"}
            height={320}
            type="line"
        />
        
    );
};

export default LineChart;