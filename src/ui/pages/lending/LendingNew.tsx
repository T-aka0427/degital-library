/* ログイン
  google認証でログイン
*/

import React from "react";
import { Outlet } from "react-router-dom";

const LendingNew = () => {
  return (
    <>
      <div>LendingNew Page</div>
      <Outlet />
    </>
  );
};

export default LendingNew;
