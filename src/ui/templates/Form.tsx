/* Form
  書籍情報の登録
*/

import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ContainerSize from "../parts/ContainerSize";
import { useForm } from "../../hooks/useForm";
import Grid from "@mui/material/Grid";
import { listenerCount } from "process";

const Form = () => {
  const { getBookInfo, data, loading, error } = useForm();

  const scan = (): void => {
    getBookInfo();
  };

  const output = () => {};

  return (
    <ContainerSize>
      <form>
        <Grid>
          <TextField label="isbnId" variant="outlined" />
          <Button variant="contained" color="primary" onClick={scan}>
            スキャン
          </Button>
        </Grid>
        <TextField label="test" value={data} variant="outlined" />
        <Button variant="contained" color="primary" onClick={output}>
          出力
        </Button>
      </form>
    </ContainerSize>
  );
};

export default Form;
