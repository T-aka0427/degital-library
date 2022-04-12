import React from "react";
import { Typography } from '@mui/material';

type Props = {
  title: string;
}

const PageTitle = (props: Props) => {
  return(
    <Typography 
    variant='h6'
    sx= {{
      fontWeight: "bold",
      textAlign: "center",
      mt: 5,
      mb: 6,
      pl: 3,
    }}>
      {props.title}
    </Typography>
  )
};

export default PageTitle;
