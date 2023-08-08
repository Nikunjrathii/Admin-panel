import React, { useState, useEffect } from 'react';

import User from './User';
import DisPieChart from './Pie';
const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => {
        console.error('Error fetching users:', error);
        setUsers([]);
      });
  }, []);

  return (
    <div className='chart w-full grid grid-col-2'>
        
    <div className="user-list flex flex-col items-center content-center">
      <h2 className='font-bold text-2xl my-2'>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <div><User id={user.id} email={user.email} username={user.username} name={user.name} address={user.address} phone={user.phone} /></div>
          </li>
        ))}
      </ul>
    </div>
    <DisPieChart/>
    </div>
  );
};

export default UserListPage;
