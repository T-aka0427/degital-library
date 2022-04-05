import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormHelperText } from '@mui/material';
import { storageLocation } from '../../../models/BookForm';

type Props = {
  fValue: string;
  fChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  fError: boolean | undefined;
  fHelperText: string | false | undefined;
  selectList: storageLocation[]
}

const StorageSelect = (props: Props) => {

  return (
    <FormControl sx={{ ml: 3, width: 250 }}>
      <InputLabel id="demo-simple-select-label">保管場所</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="outlined-required"
        label="保管場所"
        name="storageLocation"
        value={props.fValue}
        onChange={props.fChange}
      >
        {props.selectList.map((item, i) => <MenuItem key={i} value={item.id}>{item.storageLocation}</MenuItem>)}
        <MenuItem value={"new"}>保管場所を追加</MenuItem>
      </Select>
      <FormHelperText
        error={props.fError}
      >{props.fHelperText}</FormHelperText>
    </FormControl>
  );
}

export default StorageSelect;