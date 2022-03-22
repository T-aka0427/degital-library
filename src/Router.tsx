import React from "react";
//import AuthProvider from "./auth/AuthProvider";
import Top from "./ui/pages/reading/Top";
import Admin from "./ui/pages/admin/Admin";
import Register from "./ui/pages/admin/Register";
import Signup from "./ui/pages/login/Signup";
import Login from "./ui/pages/login/Login";
import Show from "./ui/pages/reading/Show";
import LendingNew from "./ui/pages/lending/LendingNew";
import LendingShow from "./ui/pages/lending/LendingShow";
import UserProfile from "./ui/pages/user/UserProfile";
import UserLending from "./ui/pages/user/UserLending";
import ReturnNew from "./ui/pages/return/ReturnNew";
import ReturnShow from "./ui/pages/return/ReturnShow";
import NoMatch from "./ui/pages/NoMatch";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RegisterRedux from "./ui/pages/admin/RegisterRedux";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Top />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/redux" element={<RegisterRedux />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/show" element={<Show />} />
        <Route path="/lending/new/:id" element={<LendingNew />} />
        <Route path="/lending/show/:id" element={<LendingShow />} />
        <Route path="/user/profile/:id" element={<UserProfile />} />
        <Route path="/user/lending/:id" element={<UserLending />} />
        <Route path="/return/new/:id" element={<ReturnNew />} />
        <Route path="/return/show/:id" element={<ReturnShow />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
