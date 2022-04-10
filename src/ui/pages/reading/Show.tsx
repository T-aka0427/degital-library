import React from "react";
import { Container } from "@mui/material";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
import Contents from "./Contents";

const Show = () => {
  return (
    <Container maxWidth="lg">
      <Header />
      <Contents />
      <Footer />
    </Container>
  );
};

export default Show;
