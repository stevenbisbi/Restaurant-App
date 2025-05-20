import { MenuPage } from "../../client/pages/MenuPage";

import { useSelector } from 'react-redux';

export function HomePage() {
  const { token, username } = useSelector(state => state.auth);
  return (
    <>
      <MenuPage />
    </>
  );
}
