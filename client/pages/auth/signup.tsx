import React, { ChangeEvent, useState } from "react";
import router from 'next/router';
import { useRequest } from "../../hooks/use_request";
import ticket_logo from "../../images/ticket_logo.png";
import Link from "next/link";

export default function signup() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })
  const {doRequest, errors} = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {email: user.email,password: user.password},
    onSuccess: () => router.push("/")
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await doRequest();
    } catch (error) {
      return error      
    }
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
          Already have an account? Go ahead and { " "}
            <span style={{color: 'grey'}}>
            <Link href="/auth/signin"> 
              Sign In
            </Link>
            </span> 
        </p>
        {errors}
      </form>
    </div>
  );
}
