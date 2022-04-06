import React from "react";

import { Container } from "@mui/material";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
import LendingForm from "./LendingForm";


const LendingNew = () => {
  return (
    <Container maxWidth="lg">
      <Header />
      <LendingForm />
      <Footer />
    </Container>
  );
};

export default LendingNew;
