import React, { useState } from 'react';
import './BmiCalculator.css';

import underweightImg from "../assets/underweight.png";
import normalImg from "../assets/normal.jpg";
import overweightImg from "../assets/overweight.jpg";
import obeseImg from "../assets/obese.jpg";

const BmiCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [bmiImage, setBmiImage] = useState(null);

  const calculateBMI = () => {
    if (!weight || !height) {
      alert('Please enter both weight and height!');
      return;
    }
    let weightInKg = parseFloat(weight);
    let heightInMeters = parseFloat(height);
    if (weightUnit === 'lb') {
      weightInKg = weightInKg * 0.453592;
    }
    if (heightUnit === 'cm') {
      heightInMeters = heightInMeters / 100;
    } else if (heightUnit === 'inch') {
      heightInMeters = heightInMeters * 0.0254;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    const roundedBmi = bmiValue.toFixed(2);
    setBmi(roundedBmi);

    let bmiStatus = '';
    let image = null;

    if (bmiValue < 18.5) {
      bmiStatus = 'Underweight🧍‍♂️';
      image = underweightImg;
    } 
    else if (bmiValue < 24.9) {
      bmiStatus = 'Normal weight';
      image = normalImg;
    } 
    else if (bmiValue < 29.9) {
      bmiStatus = 'Overweight';
      image = overweightImg;
    } 
    else {
      bmiStatus = 'Obesity';
      image = obeseImg;
    }

    setStatus(bmiStatus);
    setBmiImage(image);
  };

  return (
    <div className='container'>
      <h1>BMI Calculator</h1>
      <div className='input-group'>
        <label>
          Weight:
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder='Enter weight'
          />
        </label>

        <select 
          value={weightUnit} 
          onChange={(e) => setWeightUnit(e.target.value)}
        >
          <option value="kg">kg</option>
          <option value="lb">pounds</option>
        </select>
      </div>

      <div className='input-group'>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder='Enter height'
          />
        </label>

        <select 
          value={heightUnit} 
          onChange={(e) => setHeightUnit(e.target.value)}
        >
          <option value="cm">cm</option>
          <option value="inch">inches</option>
        </select>
      </div>

      <button onClick={calculateBMI}>Calculate</button>
      {bmi && (
        <div className='result'>
          <h3>Your BMI: {bmi}</h3>
          <h3>Status: {status}</h3>

          {bmiImage && (
            <img 
              src={bmiImage} 
              alt="BMI result"
              style={{ width: "200px", marginTop: "15px" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;