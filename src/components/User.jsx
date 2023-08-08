import React from 'react';

const SingleUser = ({
  id,
  email,
  username,
  name,
  address,
  phone,
}) => {
  return (
    <div className="user-details border border-black">
      <h2>User Details</h2>
      <p>ID: {id}</p>
      <p>Email: {email}</p>
      <p>Username: {username}</p>
      <p>Name: {name.firstname} {name.lastname}</p>
      <p>Address: {address.number} {address.street}, {address.city}, {address.zipcode}</p>
      <p>Phone: {phone}</p>
      
    </div>
  );
};

export default SingleUser;
