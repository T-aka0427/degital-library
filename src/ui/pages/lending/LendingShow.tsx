import React from "react";

import { Container } from "@mui/material";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
import LendingInfo from "../../templates/LendingReport";

const LendingShow = () => {
  return (
    <Container maxWidth="lg">
      <Header />
      <LendingInfo 
        function="貸出" 
        msg="期日になったら指定の場所まで本を取りに来てください"/>
      <Footer />
    </Container>
  );
};

export default LendingShow;
