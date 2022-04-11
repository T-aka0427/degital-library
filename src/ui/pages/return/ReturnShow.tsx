import React from "react";

import { Container } from "@mui/material";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";

import ReturnReport from "./ReturnReport";

const ReturnShow = () => {


  return (
    <Container maxWidth="lg">
      <Header />
      <ReturnReport />
      <Footer />
    </Container>
  );
};

export default ReturnShow;
