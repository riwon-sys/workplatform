import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall( { selectValue, handleChange } ) {

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }} >
      <FormControl sx={{ m: 1, minWidth: 100, }} size="small">
        <InputLabel id="demo-select-small-label"> 결재상태 </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={ selectValue }
          label="selectValue"
          onChange={ handleChange }
          defaultValue={ 0 }
        >
          <MenuItem value={ 2 }> 전체 </MenuItem>
          <MenuItem value={ 1 }> 완료 </MenuItem>
          <MenuItem value={ 0 }> 대기 </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}