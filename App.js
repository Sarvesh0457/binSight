import './App.css';
import { useEffect, useState } from 'react';
import MapBox from './MapBox';

function App() {
  const [message, setMessage] = useState('');
  const [pincode, setPincode] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/map')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  return (
    <div className="App">
      <h1>{message}</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor='pincode'>
          Enter Pincode:
        </label>
        <input type="text" value={pincode} onChange={handlePincodeChange} placeholder='Enter Pincode'/>
        <button onClick={() => setPincode(pincode)} style={{ marginLeft: '10px', cursor: 'pointer' }}> Show Button </button>
      </div>
      <div style={{ height: '500px' }}>
        <MapBox pincode={pincode} />
      </div>
    </div>
  );
}

export default App;
