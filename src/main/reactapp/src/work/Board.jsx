import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';  // useState 추가
import axios from 'axios';
import Table from '@mui/joy/Table';
import {  CssVarsProvider } from '@mui/joy/styles';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '100%',
 
}));

export default function () {
  // 게시물 목록 상태관리
  const [boards, setboards] = useState([]);
  const navigate = useNavigate();
  
  // 컴포넌트가 실행될 때 최초1번 실행 , useEffect( ()=>{ } , [] )  / 
  useEffect(() => {  // 괄호 추가
    getboards();
  }, []);

  // 자바 서버로부터 게시물목록 가져오는 함수 
  const getboards = async()=>{
  

    //const respons  = await axios.메소드명( "자바주소" )
   const response =await axios.get("http://localhost:8080/work/board")
    console.log(response.data)
    // 응답받은 게시물목록을 state 변수에 저장한다. -> state가 변경되면 컴포넌트 재렌더링 된다.
    setboards(response.data)
  }

  
  return (<>
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
          <CssVarsProvider>
          <Table>
              <thead>
              </thead>
              <tbody>
                {
                  boards.map( ( board , index )=> {
                    const commentCount = board.commentList ? board.commentList.length : 0;
                    return(<>
                      <tr>
                        <td> <span>{board.category_name || '카테고리 없음'}</span> <span>  <Link to={ '/board/detail?pid='+board.pid } >{ board.title }</Link> </span></td>
                        <td> <span>👍0</span> <span> 💬{commentCount} </span></td>
                      </tr>
                    </>)
                  } )
                }
              </tbody>
            </Table>
            <button onClick={()=>{navigate("/board/write")}}>글쓰기</button>
          
          </CssVarsProvider>
      </Item>
    </Box>
  </>);
}