import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const DisPieChart = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const locationMap = new Map();

  users.forEach(user => {
    const { address } = user;
    const city = address.city.toLowerCase();

    if (locationMap.has(city)) {
      locationMap.set(city, locationMap.get(city) + 1);
    } else {
      locationMap.set(city, 1);
    }
  });

  const locationData = Array.from(locationMap).map(([city, count]) => ({
    name: city,
    value: count,
  }));

  return (
    <div className='flex flex-col items-center p-0'>
      <h2 className='font-bold my-4'>User Distribution by Location</h2>
      {locationData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie dataKey="value" data={locationData} outerRadius={80} fill="green">
              {locationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} (${((value / locationData.reduce((sum, entry) => sum + entry.value, 0)) * 100).toFixed(2)}%)`, name]} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default DisPieChart;
