import React from "react";

export function Avatar({ username }) {
  return (
    <img
      src={`https://ui-avatars.com/api/?name=${username}&rounded=true&background=random&size=50`}
      alt="User Avatar"
      style={{ borderRadius: "50%" }} // Asegura que la imagen sea redonda
    />
  );
}
