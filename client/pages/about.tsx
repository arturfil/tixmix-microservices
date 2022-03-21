import React from "react";
import { User } from "../interfaces/User";

interface Props {
  currentUser: User
}

export default function about({currentUser}: Props) {
  return (
    <div className="container mt-5">
      <h2>About Page </h2>
    </div>
  );
}

