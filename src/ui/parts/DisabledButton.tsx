import React from 'react'

import { Box, Button } from '@mui/material';

type Props = {
  label: string;
}
const DisabledButton = (props: Props) => {
  return (
    <Button
    type="button"
    disabled
    variant="contained"
  >
    <Box sx={{color: '#FFF'}}>
      {props.label}
    </Box>
  </Button> 
  )
}

export default DisabledButton