import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "./ui/pages/reading/Top";
import Book from "./ui/pages/admin/Book";
import Signup from "./ui/pages/login/Signup";
import Login from "./ui/pages/login/Login";
import Show from "./ui/pages/reading/Show";
import LendingNew from "./ui/pages/lending/LendingNew";
import LendingShow from "./ui/pages/lending/LendingShow";
import User from "./ui/pages/user/User";
import ReturnNew from "./ui/pages/return/ReturnNew";
import ReturnShow from "./ui/pages/return/ReturnShow";
import NoMatch from "./ui/pages/NoMatch";

import AuthProvider from "./auth/AuthProvider";


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/book" element={<Book />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/top" element={<Top />} />
          <Route path="/show/:isbn" element={<Show />} />
          <Route path="/lending/new/:uid/:isbn" element={<LendingNew />} />
          <Route path="/lending/show/:uid/:isbn/:bookId" element={<LendingShow />} />
          <Route path="/user/:uid" element={<User />} />
          <Route path="/return/new/:uid/:isbn/:bookId" element={<ReturnNew />} />
          <Route path="/return/show/:uid/:isbn/:bookId" element={<ReturnShow />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
export default App;
