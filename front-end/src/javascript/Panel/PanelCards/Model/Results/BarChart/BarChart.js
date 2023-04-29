import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {CategoryScale, linear, Chart} from 'chart.js'; 
Chart.register(CategoryScale);

function BarChart(props) {
    const {audioID, sessionID} = props;
    const [soundArray,setSoundArray] = useState(null)
    const [confidenceArray, setConfidenceArray] = useState(null)
    // once component is loaded, fetches the api data.
    /*useEffect(() => {
        // Fetch the data and update the state
        fetchData();
        }, []);*/

        const fetchData = async () => {
            // makes sure that the id is parsed in correctly
            const strSessionID = sessionID.toString();
            const strAudioID = audioID.toString();

            const fetchURL = ('/GetExampleAudioResults?sessionID='+strSessionID+'&audioID='+strAudioID);
            
            // fetches data using api endpoint with given session id
            const response = await fetch(fetchURL);
            const fetched_data = await response.json();
            
            setSoundArray(fetched_data.data.map(audioObject => audioObject.sound))
            setConfidenceArray(fetched_data.data.map(audioObject => audioObject.confidence))
            // returns array of vital prop information for the audio container components
            console.log(fetched_data.data);
            //setData(fetched_data.data);
        };    
    
    return (
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: {soundArray},
            datasets: [
              {
                // Label for bars
                label: "total count/value",
                // Data or value of your each variable
                data: {confidenceArray},
                // Color of each bar
                backgroundColor: ["aqua", "green", "red", "yellow"],
                // Border color of each bar
                borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      );
}

export default BarChart;