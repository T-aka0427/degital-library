import React from "react";
import Button from "@mui/material/Button";
import { Box } from '@mui/system';

type Props = {
	onClick: () => void,
	label: string,
}
const DefaultButton = (props: Props) => {
  return (
		<Button 
			variant="contained" 
			sx={{
				color: "#42a5f5",
			}} 
			onClick={props.onClick}
		>
			<Box sx={{color: '#FFF'}}>
				{props.label}
			</Box>
		</Button> 
  );
};

export default DefaultButton;