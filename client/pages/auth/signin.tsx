import Link from "next/link";
import router from "next/router";
import React, { ChangeEvent, useState } from "react";
import { useRequest } from "../../hooks/use_request";
import ticket_logo from "../../images/ticket_logo.png";

export default function signin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: { email: user.email, password: user.password },
    onSuccess: () => router.push("/"),
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await doRequest();
    } catch (error) {
      return error;
    }
  }

  return (
    <div className="page" style={{ paddingTop: 60, borderRadius: "12px" }}>
      <form onSubmit={handleSubmit} className="form">
        <img src={ticket_logo.src} />
        <h2 className="my-4">Sign In</h2>
        <input
          name="email"
          placeholder="email"
          onChange={handleChange}
          type="text"
          className="form-control"
        />
        <input
          name="password"
          placeholder="password"
          onChange={handleChange}
          type="password"
          className="form-control"
        />
        <button className="btn btn-dark form-control">Sign In</button>
        <p style={{ color: "lightgrey", marginTop: "20px" }}>
          Don't have an account? Go ahead and{" "}
          <span style={{ color: "grey" }}>
            <Link href="/auth/signup">Sign Up</Link>
          </span>
        </p>
        {errors}
      </form>
    </div>
  );
}
