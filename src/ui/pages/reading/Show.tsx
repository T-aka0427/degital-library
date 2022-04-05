/* ログイン
  google認証でログイン
*/

import React from "react";
import { Container } from "@mui/material";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
import Contents from "./Contents";

const Show = () => {
  //pathにisbnを含ませる useParamで取得 show/978-1245565464 lending/new/1/978-23249423
  return (
    <Container maxWidth="lg">
      <Header />
      <Contents />
      <Footer />
    </Container>
  );
};

export default Show;
