import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import {useSearchParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from '@mui/material';
import {  Typography, IconButton, Avatar, Divider, Button, TextField } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';




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

export default function BoardDetail() {

  // + 경로상의 pid 가져오기 // http://localhost:5173/board/detail?pid=4
  const [searchParams] = useSearchParams();
  const pid = searchParams.get("pid");

  const [board,setBoard] = useState({});



  useEffect(()=>{//게시물 상세페이지 관리
    getview();
  },[])

  //자바 서버로부터 게시물 상세페이지 가져오는 함수
  const getview = async()=>{

  const response = await axios.get(`http://localhost:8080/work/board/view?pid=${pid}`)
  console.log(response.data)
  setBoard(response.data)

  // + pid를 서버에게 보내서 응답 가져오기.
  // `http://localhost:8080/work/board/view?pid=${pid}`
  }


  return (
    <>
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#eeeeee' }}>
        <Grid container spacing={0} sx={{ height: '100%' }}>
          {/* xs: 너비 조정 */}
          <Grid size={7} sx={{ height: '100%', margin: '0 auto' }}>  {/* size → xs 변경 */}
            <Item>

                          {/* 헤더 부분 */}
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #eee' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                <span style={{ color: '#555' }}>토픽</span>
                <span style={{ margin: '0 4px' }}>&gt;</span>
                <span style={{ color: '#4d90fe' }}>OTT위플레이</span>
                <span style={{ margin: '0 4px' }}>&gt;</span>
                <span style={{ color: '#4d90fe' }}>팔로우</span>
              </Box>
            </Box>

              {/* 게시물 제목 */}
             <Box sx={{ padding: '20px 16px 10px' }}>
              <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
                {board.title}
              </Typography>

                            {/* 작성자 정보 */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ color: '#0068c3', fontSize: '14px', fontWeight: 'medium' }}>
                    삼성물산 
                  </Box>
                  <Box sx={{ color: '#999', fontSize: '14px', marginLeft: '4px' }}>
                    ********
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#999', fontSize: '13px', marginRight: '8px' }}>
                    <span>2일</span>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#999', fontSize: '13px', marginRight: '8px' }}>
                    <span>👁️ {board.view}</span>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#999', fontSize: '13px' }}>
                    <span>💬 10</span>
                  </Box>
                  <IconButton size="small">
                    <MoreHorizIcon sx={{ fontSize: '18px' }} />
                  </IconButton>
                </Box>
              </Box>

            </Box>

             {/* 게시물 내용 */}
             <Box sx={{ padding: '0 16px 20px', borderBottom: '1px solid #eee' }}>
              <Typography sx={{ fontSize: '15px', lineHeight: 1.6, marginBottom: '16px' }}>
                {board.content}
              </Typography>

               {/* 좋아요 버튼 및 공유 버튼 */}
               <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                <Button variant="text" sx={{ color: '#666', fontSize: '14px', mr: 1 }}>
                  <ThumbUpOutlinedIcon sx={{ fontSize: '18px', mr: 0.5 }} /> 
                  1
                </Button>
                <Button variant="text" sx={{ color: '#666', fontSize: '14px', mr: 1 }}>
                  <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: '18px', mr: 0.5 }} /> 
                  10
                </Button>
                <Box sx={{ marginLeft: 'auto', display: 'flex' }}>
                  <Avatar sx={{ bgcolor: '#FFD700', width: 24, height: 24, fontSize: '12px', mr: 1 }}>K</Avatar>
                  <Avatar sx={{ bgcolor: '#3b5998', width: 24, height: 24, fontSize: '12px', mr: 1 }}>f</Avatar>
                  <Avatar sx={{ bgcolor: '#1DA1F2', width: 24, height: 24, fontSize: '12px', mr: 1 }}>t</Avatar>
                  <Avatar sx={{ bgcolor: '#444', width: 24, height: 24, fontSize: '12px', mr: 1 }}>...</Avatar>
                </Box>
              </Box>

             </Box> 
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}