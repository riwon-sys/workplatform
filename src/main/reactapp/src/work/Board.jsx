import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import Table from '@mui/joy/Table';
import { CssVarsProvider } from '@mui/joy/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
  
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  
  // 페이지 변경 시 데이터를 다시 불러오도록 의존성 추가
  useEffect(() => {
    getboards(page);
  }, [page]); // page가 변경될 때마다 실행
  
  // 자바 서버로부터 게시물목록 가져오는 함수
  const getboards = async(pageNum = 1) => {
    // 페이지 번호가 없으면 기본값 1 사용
    const fetchPage = pageNum || 1;
    
    try {
      const response = await axios.get(`http://localhost:8080/work/board?page=${fetchPage}&pageSize=10`);
      console.log(response.data);
      
      // 응답받은 게시물목록을 state 변수에 저장
      if(response.data.list != null) {
        setboards(response.data.list);
      } else {
        setboards([]);
      }
      
      setPage(response.data.pageNum);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
      setboards([]);
    }
  }
  
  // mui 페이지네이션 페이지 번호 가져오기
  const handlePageChange = (e, value) => {
    setPage(value);
    // getboards(value); // 여기서 직접 호출할 필요 없음 - useEffect에서 처리
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
          padding: '50px 150px'
        }}
      >
        <CssVarsProvider>
          <h1> 사내 게시판 </h1>
          <Table sx={{ mt: 3 }}>
            <thead>
              <tr>
                <th>제목</th>
                <th style={{ width: '120px', textAlign: 'right' }}>좋아요/댓글</th>
              </tr>
            </thead>
            <tbody>
              {
                boards.map((board, index) => {
                  const commentCount = board.ccount
                  return (
                    <tr key={board.pid}>
                      <td style={{textAlign:"left"}}>
                        <span style={{ 
                          textAlign: 'left', 
                          display: 'inline-block', 
                          marginRight: '8px',
                          backgroundColor: '#f0f0f0',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '0.85em'
                        }}>
                          {board.category_name || '카테고리 없음'}
                        </span>
                        <span><Link to={'/board/detail?pid=' + board.pid}>{board.title}</Link></span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span style={{ marginRight: '12px' }}>👍 {board.lcount || 0}</span>
                        <span style={{ color: commentCount > 0 ? '#0068c3' : '#666' }}>
                          💬 {commentCount}
                        </span>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          
          {/* 블라인드 스타일 버튼 컨테이너 */}
          <div className="button-container" style={{ justifyContent: 'flex-end' }}>
            <button
              className="blind-button"
              onClick={() => {navigate("/board/write")}}
            >
              글쓰기
            </button>
          </div>
        </CssVarsProvider>
        
        <Stack spacing={2} mt={1}>
          <Pagination
            color="primary"
            page={page}
            count={totalPages}
            defaultPage={1}
            onChange={handlePageChange}
            sx={{ display: 'flex', justifyContent: 'center' }}
          />
        </Stack>
      </Item>
    </Box>
  </>);
}