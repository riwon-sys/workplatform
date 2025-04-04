import { useEffect } from 'react';

/* mui import */
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect( { rank, handleChange, members, value } ) {

  // useEffect(() => {
  //   if ((value === null || value === undefined || value === "") && members.length > 0) {
  //     console.log("handleChange 호출:", members[0]?.mno);
  //     handleChange({ target: { value: members[0]?.mno } });
  //   }
  // }, [value, members, handleChange]);

  return (
    <FormControl sx={{ minWidth: 95, maxWidth: 95 }} size="small" >
      <InputLabel id="demo-select-small-label" sx={{ mt: -1, pl: 2 }} > { rank } </InputLabel>
      <Select
        labelId={ `rank-select-${rank}` }
        id={ `rank-select-${rank}` }
        // value={ value ?? members[0]?.mno ?? "" }
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
        <MenuItem value={ null } > 
          <em> 선택안함 </em>
        </MenuItem>
        {
          members.map( (member) => (
            <MenuItem key={ member.mno } value={ member.mno } > { member.mname } </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}