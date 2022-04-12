import React from "react";
import Button from "@mui/material/Button";
import { Box } from '@mui/system';

type Props = {
	label: string;
}
const SubmitButton = (props: Props) => {
  return (
    <Button
      type="submit"
      variant="contained" 
      sx={{
        color: "#42a5f5",
      }}
    >
      <Box sx={{color: '#FFF'}}>
        {props.label}
      </Box>
    </Button> 
  );
};

export default SubmitButton;