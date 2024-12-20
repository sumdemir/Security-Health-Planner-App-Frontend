import React, { useState } from 'react';
import axios from 'axios';
import { Select, Option, Button } from 'antd';
import Dashboard from './DietPlanning';

const GenerateDietPlanForm = () => {
  const [clientId, setClientId] = useState(null); // clientId'yi formdan alacağız
  const [dietitianId, setDietitianId] = useState(null); // dietitianId'yi formdan alacağız
  const [medicalConditions, setMedicalConditions] = useState([]); // tıbbi durumlar
  const [dietPlan, setDietPlan] = useState(null); // Oluşan diyet planı

  const handleGenerateDietPlan = async () => {
    try {
      const response = await axios.post('/api/getDietPlan', null, {
        params: {
          clientId: clientId,
          dietitianId: dietitianId,
        }
      });
      setDietPlan(response.data); // Diyet planı sonucunu state'e al
    } catch (error) {
      console.error('Error generating diet plan:', error);
    }
  };

  return (
    <div>
      <div>
        <label>Client ID:</label>
        <input 
          type="number" 
          value={clientId} 
          onChange={(e) => setClientId(e.target.value)} 
        />
      </div>

      <div>
        <label>Dietitian ID:</label>
        <input 
          type="number" 
          value={dietitianId} 
          onChange={(e) => setDietitianId(e.target.value)} 
        />
      </div>

      <div>
        <label>Medical Conditions:</label>
        <Select
          mode="tags"
          value={medicalConditions}
          onChange={setMedicalConditions}
          placeholder="Enter medical conditions (if any)"
        >
          <Option value="Diabetes">Diabetes</Option>
          <Option value="Hypertension">Hypertension</Option>
          <Option value="None">None</Option>
          {/* Diğer seçenekler buraya eklenebilir */}
        </Select>
      </div>

      <div>
        <Button onClick={handleGenerateDietPlan}>Generate Diet Plan</Button>
      </div>

      {dietPlan && (
        <div>
          <h2>Your Generated Diet Plan:</h2>
          <p>{dietPlan.planDetails}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
