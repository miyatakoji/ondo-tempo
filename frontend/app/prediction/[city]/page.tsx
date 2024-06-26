"use client"
import React, { useState } from 'react';
import "./index.css";
import Head from 'next/head';
import Link from 'next/link';

interface CityData {
  betCount: number;
  temperatures: number[];
  yourPredictions: number[];
}

interface PredictionData {
  [key: string]: CityData;
}

const predictionData : PredictionData = {
  "Tokyo": {
    betCount: 34,
    temperatures: Array.from({length: 40}, (_, i) =>  Math.random() +15 + Math.round(Math.sin(i) * 4)),
    yourPredictions: Array.from({length: 40}, (_, i) =>  Math.random() +15 + Math.round(Math.sin(i) * 4))
  },
  "London": {
    betCount: 29,
    temperatures: Array.from({length: 40}, (_, i) => Math.random() + 10 + Math.round(Math.sin(i) * 5.3)),
    yourPredictions: Array.from({length: 40}, (_, i) =>  Math.random() +15 + Math.round(Math.sin(i) * 4))
  },
  "NewYork": {
    betCount: 45,
    temperatures: Array.from({length: 40}, (_, i) => Math.random() + 11 + Math.round(Math.cos(i) * 8.5)),
    yourPredictions: Array.from({length: 40}, (_, i) =>  Math.random() +15 + Math.round(Math.sin(i) * 4))
  },
  "Rome": {
    betCount: 25,
    temperatures: Array.from({length: 40}, (_, i) => Math.random() + 20 + Math.round(Math.sin(i) * 7.5)),
    yourPredictions: Array.from({length: 40}, (_, i) =>  Math.random() +15 + Math.round(Math.sin(i) * 4))
  },
  "Kairo": {
    betCount: 30,
    temperatures: Array.from({length: 40}, (_, i) => Math.random() + 23 + Math.round(Math.cos(i) * 6.7)),
    yourPredictions: Array.from({length: 40}, (_, i) =>  Math.random() +15 + Math.round(Math.sin(i) * 4))
  },
  "Sidney": {
    betCount: 38,
    temperatures: Array.from({length: 40}, (_, i) => Math.random() + 18 + Math.round(Math.sin(i) * 8.2)),
    yourPredictions: Array.from({length: 40}, (_, i) =>  Math.random() +15 + Math.round(Math.sin(i) * 4))
  }
};

const Predict = ({ params }: { params: { city: string } }) => {
  const cityName = params.city
  const city = predictionData[cityName];
  const [amount, setAmount] = useState('');
  const [submited, setSubmit] = useState(false);


  const handleSubmit = () => {
    setSubmit(true);
  };

  const dates:string[] = [];
  const today = new Date();


  for (let i = 0; i <= 40; i++) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);
    dates.push(pastDate.toLocaleDateString()); // 日付をローカル形式で整形
  }
  
  let destDate:Date = new Date(today);
  destDate.setDate(today.getDate() + 30)
  const datestr = destDate.toLocaleDateString();
  const imagename = "/"+cityName+"-img.png";

  const [temperature, setTemperature] = useState('');

  // if (!city) return <p>Loading...</p>;

  return (
    <div  className=" citypage">
      
    
    <div className="container">
      <Head>
          <title>BetOnDo Home</title>
      </Head>

      <header className="header">
        <div className="logo">
        <Link href="/"><h1>BetOnDo</h1></Link>

        </div>
        <nav>
          <Link className="navlink"  href="/profile">My Profile</Link>
        </nav>
      </header>
      <img src={imagename} alt="Results" className="cityimagepage"/>
      <div className="wrap">
        <div className="main-colum">
        <h2>{cityName} Temperature Prediction</h2>
        <div className="stats">
          <p>Please prediction {datestr} s Temperature</p>
          <p>If your prediction is the closest to the actual temperature, this prize will be yours</p>
          <p>Current Prize: ${city.betCount * 10} (Bet Count:{city.betCount})</p>
        </div>
        </div>
        
        <div className="form">
          <div>
          <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter your prediction"
        />
        <button onClick={handleSubmit}>Submit</button>
          </div>
          {submited && (
        <p className="confirmation">
          You have successfully submit as {amount} .
        </p>
      )}
          
        </div>
        <div className="history">
          <h2>Past Month Temperatures</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Oracles Temperature (°C)</th>
                <th>Your Predction (°C)</th>
              </tr>
            </thead>
            <tbody>
              {city.temperatures.map((item, index) => (
                <tr key={index}>
                  <td>{dates[index]}</td>
                  <td>{item.toFixed(1)}</td>
                  <td>{city.yourPredictions[index].toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div></div>
  );
};

export default Predict;