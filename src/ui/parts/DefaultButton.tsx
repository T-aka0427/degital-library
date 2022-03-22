/* DefaultButton
  書籍情報の登録
*/

import React from "react";
import Button from "@mui/material/Button";

const DefaultButton = (props: () => void) => {
  return (
    <Button variant="contained" color="primary" onClick={props}>
      登録
    </Button>
  );
};

export default DefaultButton;
