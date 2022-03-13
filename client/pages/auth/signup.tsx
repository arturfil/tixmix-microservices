import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import ticket_logo from "../../images/ticket_logo.png";

export default function signup() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''

  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const { email, password } = user;
    const response = await axios.post('/api/users/signup', {
      email, password
    })
    console.log(response.data);
    
  }

  return (
    <div className="page" style={{ paddingTop: 60, borderRadius: "12px" }}>
      <form onSubmit={handleSubmit} className="form">
        <img src={ticket_logo.src} />
        <h2 className="my-4">Sign Up</h2>
        <input 
          name="name"
          onChange={handleChange}
          placeholder="name" 
          type="text" 
          className="form-control" 
        />
        <input 
          name="email"
          onChange={handleChange}
          placeholder="email" 
          type="text" 
          className="form-control" 
        />
        <input
          name="password"
          onChange={handleChange}
          placeholder="password"
          type="password"
          className="form-control"
        />
        <button className="btn btn-dark form-control">Sign Up</button>
        <p style={{ color: "lightgrey", marginTop: "20px" }}>
          Already have an account? Go ahead and 
            <span style={{color: 'grey'}}>
            {" "}sign in
            </span> 
        </p>
      </form>
    </div>
  );
}
