import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';  // useState 추가
import axios from 'axios';
import Table from '@mui/joy/Table';
import {  CssVarsProvider } from '@mui/joy/styles';
import { Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useSelector } from 'react-redux';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '100%',
  
}));

export default function BoardUpdate(){

    // + 경로상의 pid 가져오기 // http://localhost:5173/board/detail?pid=4
    const [searchParams] = useSearchParams();
    const pid = searchParams.get("pid");


  const loginInfo = useSelector( (state) => state.user.userInfo );

    // 게시물 정보를 저장할 상태 변수
    const [boardForm,setBoardForm] = useState({
        title : '',
        content: '',
        category_id: '1',
        mno : loginInfo.mno ,
        pid : pid

    });

    //페이지 이동을 위한 navigate
    const navigate = useNavigate();

      useEffect(()=>{//게시물 상세페이지 관리
        getview();
      },[])
    
      //자바 서버로부터 게시물 상세페이지 가져오는 함수
      const getview = async()=>{
        try {
          const response = await axios.get(`http://localhost:8080/work/board/view?pid=${pid}`);
          console.log("게시물 데이터:", response.data);
          setBoardForm({
            title : response.data.title,
            content: response.data.content,
            category_id: response.data.category_id,
            mno : loginInfo.mno ,
            pid : pid
    
        });
        } catch (error) {
          console.error("오류:", error);
        }
      
    
      // + pid를 서버에게 보내서 응답 가져오기.
      // `http://localhost:8080/work/board/view?pid=${pid}`
      }


    //입력값 변경 처리 함수
    const onValueChange = (e)=>{
        setBoardForm({...boardForm,[e.target.name]:e.target.value})
    };



    //게시물 수정함수

    const updateBoard = async()=>{
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
        const response = await axios.put('http://localhost:8080/work/board', boardForm);
        if(response.data === true){
            alert('게시물 등록되었습니다.');
            navigate('/board');
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
    navigate('/board');
}
    

    return (
        <>
                  <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', justifyContent: 'center', backgroundColor: '#eeeeee' }}>
            <Item
              sx={{
                overflow: 'scroll',
                overflowX: 'hidden',
                minWidth: '700px',
                maxWidth: '1000px',
                width: '100%',
                padding: '50px 70px'
              }}
            >
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                        게시물 수정
                </Typography>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                    {/* 카테고리 선택 */}
              <FormControl fullWidth>
                <InputLabel id="category-label">카테고리</InputLabel>
                <Select
                  labelId="category-label"
                  name="category_id"
                  value={boardForm.category_id}
                  label="카테고리"
                  onChange={onValueChange}
                >
                  <MenuItem value="1">자유게시판</MenuItem>
                  <MenuItem value="2">스포츠</MenuItem>
                  <MenuItem value="3">마음의소리</MenuItem>
                  <MenuItem value="4">중고거래</MenuItem>
                  
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
                  onClick={updateBoard}
                  sx={{ 
                    px: 3,
                    backgroundColor: '#0068c3', 
                    '&:hover': { backgroundColor: '#0056a3' }
                  }}
                >
                  수정완료
                </Button>
                </Box>
                
                </Item>
             
          </Box>
        </>
      );
    }