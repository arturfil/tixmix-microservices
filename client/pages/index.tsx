import React from 'react'
import buildClient from '../api/buildClient';
import { User } from '../interfaces/User';

interface Props {
  currentUser: User | null;
}

export default function HomePage({currentUser}: Props) {


  console.log(currentUser);
  return (
    <div className="container mt-5">
      <h2>Home Page</h2>
      {currentUser ? (
        <h4>Welcome {currentUser.email}</h4>
      ) : (
        <h4>You need to sign in!</h4>
      )}
    </div>
  )
}

HomePage.getInitialProps = async (context: Object) => {
  console.log('HOME PAGE');
  
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser')
  return data;
}