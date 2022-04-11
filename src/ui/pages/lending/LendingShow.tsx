import React from "react";

import { Container } from "@mui/material";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
import LendingReport from "./LendingReport";

const LendingShow = () => {

  return (
    <Container maxWidth="lg">
      <Header />
      <LendingReport />
      <Footer />
    </Container>
  );
};

export default LendingShow;
