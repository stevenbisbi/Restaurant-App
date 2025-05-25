import React from "react";

export function Avatar({ name }) {
  return (
    <img
      src={`https://ui-avatars.com/api/?name=${name}&rounded=true&background=random&size=50`}
      alt="User Avatar"
      style={{ borderRadius: "50%" }} // Asegura que la imagen sea redonda
    />
  );
}
