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
  color: theme.palette.text.secondary,
  ...theme.applyStyles?.('dark', {  // 옵셔널 체이닝 추가
    backgroundColor: '#1A2027',
  }),
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
          width: '100%'
        }}
      >
          <CssVarsProvider>
          <Table>
              <thead>
              </thead>
              <tbody>
                {
                  boards.map( ( board , index )=> {
                    return(<>
                      <tr>
                        <td> <span>OTT뭐볼까?(카테고리)</span> <span>  <Link to={ '/board/detail?pid='+board.pid } >{ board.title }</Link> </span></td>
                        <td> <span>👍1</span> <span> 💬10 </span></td>
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