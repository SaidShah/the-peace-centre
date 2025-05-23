import './App.css'
import Dashboard from './components/Dashboard'
import { useState, useEffect } from 'react'

function App() {
  const [adhanTimes, setAdhanTimes] = useState({})

  useEffect(() => {
    const fetchAdhanTimes = () => {
      const now = new Date();
      const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

      const requestOptions = {
        method: "GET",
        redirect: "follow" as RequestRedirect
      };

      fetch(`https://api.aladhan.com/v1/timingsByAddress/${formattedDate}?address=Carlisle%2C+Pennsylvania%2C+US&method=2&shafaq=general&tune=0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0&school=0&midnightMode=0&timezonestring=America%2FNew_York&latitudeAdjustmentMethod=3&calendarMethod=UAQ`, requestOptions)
        .then((response) => response.text())
        .then((result) => setAdhanTimes(JSON.parse(result)))
        .catch((error) => console.error(error));
    };

      const interval = setInterval(() => {
        const now = new Date();
        const isSunday = now.getDay() === 0;
        const is1AM = now.getHours() === 1 && now.getMinutes() === 0;
  
        if (isSunday && is1AM) {
          fetchAdhanTimes();
        }
      }, 60 * 1000); 
  
      fetchAdhanTimes();
  
      return () => clearInterval(interval); // Cleanup interval on component unmount
    
  }, [])

  return (
    <>
      <div>
        <Dashboard adhanTimes={adhanTimes} />
      </div>
    </>
  )
}

export default App
