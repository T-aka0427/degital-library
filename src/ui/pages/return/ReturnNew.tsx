import React from "react";

import { Container } from "@mui/material";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
import ReturnForm from "./ReturnForm";

const ReturnNew = () => {
  return (
    <Container maxWidth="lg">
      <Header />
      <ReturnForm />
      <Footer />
    </Container>
  );
};

export default ReturnNew;
