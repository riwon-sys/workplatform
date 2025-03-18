import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect( { rank, handleChange, members, value } ) {

  return (
    <FormControl sx={{ minWidth: 95, maxWidth: 95 }} size="small" >
      <InputLabel id="demo-select-small-label" sx={{ mt: -1, pl: 2 }} > { rank } </InputLabel>
      <Select
        labelId={ `rank-select-${rank}` }
        id={ `rank-select-${rank}` }
        value={ value }
        onChange={ handleChange }
        variant="filled" // filled 사용하여 아래쪽 줄 제거
        disableUnderline // underline 완전 제거 (filled, standard일 때만 적용됨)
        sx={{
          height: "28px",
          backgroundColor: "transparent", // 배경 투명화
          "&::before, &::after": { display: "none" }, // before, after 줄 제거
          "& .MuiSelect-select": { padding: "4px 8px" }, // 패딩 조정
        }}
      >
        {
          members.map( (member) => (
            <MenuItem key={ member.mno } value={ member.mno } > { member.mname } </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}