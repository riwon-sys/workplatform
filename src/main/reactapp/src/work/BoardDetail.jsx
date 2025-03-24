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
import ImageIcon from '@mui/icons-material/Image';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'left',
  height: '100%',
  color: theme.palette.text.secondary,
  ...theme.applyStyles?.('dark', {  // 옵셔널 체이닝 추가
    backgroundColor: '#1A2027',
  }),
}));


// // 자바 서버로부터 게시물목록 가져오는 함수 
// const getboards = async()=>{

//   //const respons  = await axios.메소드명( "자바주소" )
//  const response =await axios.get("http://localhost:8080/work/board")
//   console.log(response.data)
//   // 응답받은 게시물목록을 state 변수에 저장한다. -> state가 변경되면 컴포넌트 재렌더링 된다.
//   setboards(response.data)
// }

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

  //HTML에서 입력한 데이터를 STATE에서 관리
  const[comment,setComment] = useState('');
  //작성자 샘플 : 리덕스에서 가져올 예정
  const mno = 100001;

  //댓글 등록함수
  const createComment = async() => {
    const sendData = {mno:mno , pid:pid , content : comment }
    const response = await axios.post('http://localhost:8080/work/reply' , sendData )
    if(response.data == true){alert('댓글이 등록 되었습니다.');setComment('');getview();}
    else{alert('댓글 작성을 실패했습니다.');}
  }


  //댓글 수정 모달열기
  const openEditModal = (comment) => {
    setEditComment({
      cid: comment.cid,
      content: comment.content
    });
    setIsEditModalOpen(true);
  };

  //댓글 수정 모달 닫기

    // 댓글 수정 모달 닫기
    const closeEditModal = () => {
      setIsEditModalOpen(false);
      setEditComment({ cid: null, content: '' });
    };

    // 댓글 수정 함수
    const updateComment = async() => {
      if(!editComment.content.trim()) {
        alert('댓글 내용을 입력해주세요.');
        return;
      }


        
    const sendData = { 
      cid: editComment.cid, 
      mno: mno, 
      content: editComment.content 
    };

    try {
      const response = await axios.put('http://localhost:8080/work/reply', sendData);
      if(response.data === true) {
        alert('댓글이 수정되었습니다.');
        closeEditModal();
        getview(); // 댓글 목록 새로고침
      } else {
        alert('댓글 수정에 실패했습니다.');
      }
    } catch(error) {
      console.error('댓글 수정 오류:', error);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };


  //댓글 삭제 함수


  const deleteComment = async(cid) => {
    if(!window.confirm('정말 이 댓글을 삭제하시겠습니까?')) {
      return;
    }


       
    try {
      const response = await axios.delete(`http://localhost:8080/work/reply?cid=${cid}&mno=${mno}`);
      if(response.data === true) {
        alert('댓글이 삭제되었습니다.');
        getview(); // 댓글 목록 새로고침
      } else {
        alert('댓글 삭제에 실패했습니다.');
      }
    } catch(error) {
      console.error('댓글 삭제 오류:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#eeeeee' }}>
        <Grid container spacing={0} sx={{ height: '100%' }}>
          {/* xs: 너비 조정 */}
          <Grid size={7} sx={{ height: '100%', margin: '0 auto' }}>  {/* size → xs 변경 */}
            <Item sx={{overflow:'scroll',overflowX:'hidden'}}>

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

              {/* 댓글 섹션 */}
              <Box sx={{ padding: '16px', borderBottom: '1px solid #eee' }}>
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
                  댓글 {board.commentList && board.commentList.length}
              </Typography>

               {/* 댓글 작성 폼 */}
               <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="댓글을 남겨주세요."
                  variant="outlined"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '4px',
                      fontSize: '14px'
                    }
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                  <Button
                    startIcon={<ImageIcon />}
                    sx={{ color: '#999', fontSize: '13px' }}
                  >
                    사진 첨부
                  </Button>
                  <Button
                  onClick={createComment}
                    variant="contained"
                    sx={{ 
                      backgroundColor: '#0068c3', 
                      color: 'white',
                      fontSize: '14px',
                      padding: '6px 16px',
                      '&:hover': {
                        backgroundColor: '#0056a3'
                      }
                    }}
                  >
                    등록
                  </Button>
                </Box>
              </Box>
              </Box>
              {/*현재 게시물 해당하는 댓글조회 , 리스트명.map((반복변수,인덱스)),조건&&참 */}
              {board.commentList && board.commentList.map((comment,index)=>{
             return (
              <Box 
                key={index}
                sx={{ 
                  padding: '12px 16px', 
                  borderBottom: '1px solid #eee',
                  textAlign: 'left'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                    {comment.mno}
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#999' }}>
                    {comment.reg_date}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '14px', marginBottom: '12px', color: '#333' }}>
                  {comment.content}
                </Typography>
                <Box sx={{ display: 'flex', gap: '8px' }}>
                  <Button size="small" sx={{ fontSize: '12px', color: '#666', minWidth: 'auto', padding: '2px 8px' }}>수정</Button>
                  <Button size="small" sx={{ fontSize: '12px', color: '#666', minWidth: 'auto', padding: '2px 8px' }}>삭제</Button>
                </Box>
              </Box>
            );
          })}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}