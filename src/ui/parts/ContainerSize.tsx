/* Container
  書籍情報の登録
*/

import React from "react";
import Container from "@mui/material/Container";

type Props = {
  children: React.ReactNode;
};
const ContainerSize = (props: Props) => {
  return <Container maxWidth="md">{props.children}</Container>;
};

export default ContainerSize;
