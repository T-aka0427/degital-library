/* ログイン
  google認証でログイン
*/

import React, { useEffect } from "react";
import Card from "./Card";

import Container from "@mui/material/Container";

import Header from "../../../ui/templates/Header";
import Footer from "../../templates/Footer";

const Top = () => {
  return (
    <Container maxWidth="lg">
      <Header />
      <Card />
      <Footer />
    </Container>
  );
};

export default Top;
