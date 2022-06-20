import React,{useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data,setData]=useState({});
  const [location,setLocation]=useState();

  const url=`https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=your_api_key`;

  const searchLocation=(event)=>{
    console.log(event.key)
    if(event.key==='Enter'){
      axios.get(url).then((response)=>{
        console.log(response)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=imperial&appid=your_api_key`).then((res)=>{
          console.log(res)
          setData(res.data);
        })
      })
      setLocation('');
    }
  }
  return (
   <div className="app">
    <div className="search">
      <input 
      value={location}
      onChange={event => setLocation(event.target.value)}
      onKeyPress={searchLocation}
      placeholder="Enter Location"
      type="text" />
    </div>
    <div id="container">
      <div id="city">
        <p>{data.name}</p>
      </div>
     <div id="border">
      <p id="degree">{data.main ? <h1>{((data.main.temp-32)*5/9).toFixed(0)} °C</h1>:null}</p>
      <p id="main">{data.weather ? <p>{data.weather[0].main}</p>:null}</p>
      <p id="feels">{data.weather ? <p>{((data.main.feels_like-32)*5/9).toFixed(0)} °C</p>:null}</p>
      </div>
    </div>
    
   </div>
  );
}

export default App;
