import React from "react";
import { LogoutButton } from "../../client/components/LogoutButton";
import { MenuPage } from "../../client/pages/MenuPage";

export function HomePage() {
  return (
    <>
      <MenuPage />
      <LogoutButton />
    </>
  );
}
