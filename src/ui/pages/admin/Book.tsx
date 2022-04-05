import React from "react";

import { Container } from "@material-ui/core";
import BookForm from "./BookForm";
import Header from "../../templates/Header";

const Register = () => {
  return (
    <Container maxWidth="lg">
      <Header />
      <BookForm />
    </Container>
  );
};

export default Register;
