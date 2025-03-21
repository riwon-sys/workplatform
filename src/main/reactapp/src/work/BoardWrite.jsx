import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';  // useState 추가
import axios from 'axios';
import Table from '@mui/joy/Table';
import {  CssVarsProvider } from '@mui/joy/styles';
import { Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '100%',
  color: theme.palette.text.secondary,
  ...theme.applyStyles?.('dark', {  // 옵셔널 체이닝 추가
    backgroundColor: '#1A2027',
  }),
}));

export default function BoardWrite(){
    // 게시물 정보를 저장할 상태 변수
    const [boardForm,setBoardForm] = useState({
        title : '',
        content: '',
        category: '자유게시판',
        mno : '100001'

    });

    //입력값 변경 처리 함수
    const onValueChange = (e)=>{
        setBoardForm({...boardForm,[e.target.name]:e.target.value})
    };

    //페이지 이동을 위한 navigate
    const navigate = useNavigate();

    //게시물 등록 함수

    const createBoard = async()=>{
        //입력값 검증
    if(!boardForm.title.trim()){
        alert('제목을 입력해주세요.');
        return;
    }
    if(!boardForm.content.trim()){
        alert('내용을 입력해주세요.');
        return;
    }

    try{
        //서버로 데이터전송
        const response = await axios.post('http://localhost:8080/work/board', boardForm);
        if(response.data === true){
            alert('게시물 등록되었습니다.');
            navigate('/');
        }else{
            alert('게시물 등록에 실패했습니다.');
        }
    }catch(error){
        console.error('게시물 등록 오류:',error);
        alert('게시물 등록시 오류가 발생했습니다.');
    }

   };

   //취소버튼 클릭 처리
   const onCancel = ()=>{
    navigate('/');
}
    

    return (
        <>
          <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#eeeeee' }}>
            <Grid container spacing={0} sx={{ height: '100%' }}>
              {/* xs: 너비 조정 */}
              <Grid size={7} sx={{ height: '100%', margin: '0 auto' }}>  {/* size → xs 변경 */}
                <Item>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                        게시물 작성
                </Typography>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                    {/* 카테고리 선택 */}
              <FormControl fullWidth>
                <InputLabel id="category-label">카테고리</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={boardForm.category}
                  label="카테고리"
                  onChange={onValueChange}
                >
                  <MenuItem value="자유게시판">자유게시판</MenuItem>
                  <MenuItem value="스포츠">스포츠</MenuItem>
                  <MenuItem value="마음의소리">마음의소리</MenuItem>
                  <MenuItem value="중고거래">중고거래</MenuItem>
                  
                </Select>
              </FormControl>
               {/* 제목 입력 */}
               <TextField
                fullWidth
                label="제목"
                name="title"
                value={boardForm.title}
                onChange={onValueChange}
                placeholder="제목을 입력하세요"
                variant="outlined"
              />

               {/* 내용 입력 */}
               <TextField
                fullWidth
                label="내용"
                name="content"
                value={boardForm.content}
                onChange={onValueChange}
                placeholder="내용을 입력하세요"
                multiline
                rows={10}
                variant="outlined"
              />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button 
                  variant="outlined" 
                  onClick={onCancel}
                  sx={{ px: 3 }}
                >
                  취소
                </Button>
                <Button 
                  variant="contained" 
                  onClick={createBoard}
                  sx={{ 
                    px: 3,
                    backgroundColor: '#0068c3', 
                    '&:hover': { backgroundColor: '#0056a3' }
                  }}
                >
                  등록
                </Button>
                </Box>
                
                </Item>
              </Grid>
            </Grid>
          </Box>
        </>
      );
    }