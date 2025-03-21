import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Report_List from './Report_List';
import Report_Form from './Report_Form';

import * as React from 'react';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    height: '100%', // 높이 설정 추가
}));

export default function Report_View() {

  const { rpno } = useParams();
  const [ formData, setFormData ] = useState({
    rpname: '',
    rpam: '',
    rppm: '',
    rpamnote: '',
    rppmnote: '',
    rpunprocessed: '',
    rpsignificant: '', 
    rpexpected: '',
    mname: '',
    mrank: '',
    mdepartment: '' 
  });
  const [ reports, setReports ] = useState( [] );
  const [ page, setPage ] = useState(1); // 현재 페이지
  const [ totalPages, setTotalPages ] = useState(1); // 전체 페이지 수
  const [ approval, setApproval ] = useState( [] );
  const navigate = useNavigate();
  
  const formDataChange = (e) => {
    setFormData( { ...formData, [ e.target.name ] : e.target.value } );
  } // f end

  // 보고서 상세 조회 함수
  useEffect(() => { 
    if ( rpno ) { onFindByRpno(); } 
  }, [ rpno ]);

  const onFindByRpno = async ( props ) => {
    if( !rpno ){ return; }
    try{
      const response = await axios.get( `http://localhost:8080/api/report/view?rpno=${rpno}` );
      setFormData( response.data );
    }catch( e ){ console.log( e ) }
  } // f end

  // 수정 페이지 이동 함수
  const onUpdate = async () => { await navigate( `/report/update/${rpno}` ) }

  // 보고서 삭제 함수
  const onDelete = async () => {  
    if( !confirm('보고서를 삭제하시겠습니까?') ){ return; }
    try{
      const response = await axios.put( `http://localhost:8080/api/report/delete?rpno=${rpno}` )
      if( response.data ){
        alert('보고서 삭제가 완료되었습니다.')
        navigate( 0 ); // 0 : 페이지 새로고침
        navigate( '/report/view' );
      }else{ alert('보고서 삭제 실패'); }
    }catch( e ){ console.log( e ); }
  }

  // mui 페이지네이션 페이지 번호 가져오기
  const handlePageChange = ( e, value ) => {
    setPage( value );
  }

  // rpno 바뀔때마다 결재자 찾기
  useEffect( () => { onApprovalByRpno( rpno ); }, [ rpno ] );

  // 보고서 결재자 찾기
  const onApprovalByRpno = async ( rpno ) => {
    try{
      const response = await axios.get( `http://localhost:8080/api/approval?rpno=${rpno}`);
      setApproval( response.data );
    }catch( e ){ console.log( e ); } 
  } // f end

  return (
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={0} sx={{ height: '100%' }}> 
          {/* size: 너비 조정 */}
          <Grid size={5} pt={2} sx={{ height: '100%' }} minWidth={ '420px' } > 
            <Item>
              <h1> 보고서 목록 </h1>
              <br/>
              <CssVarsProvider>
                <Report_List 
                  rpno={ rpno } 
                  reports={ reports } 
                  page={ page }
                  setReports={ setReports }
                  setPage={ setPage }
                  setTotalPages={ setTotalPages }              
                />
              </CssVarsProvider>

              <Stack spacing={2} mt={1} >
                <Pagination 
                  color="primary"
                  page={ page }
                  count={ totalPages } 
                  defaultPage={ 1 }
                  onChange={ handlePageChange }
                  sx={{ display: 'flex', justifyContent: 'center' }}
                />
              </Stack>
            </Item>
          </Grid>
          
          <Grid size={7} sx={{ height: '100%', margin: '0 auto' }}>
            <Item sx={{ overflow: 'scroll', overflowX: 'hidden', minWidth: '700px', padding: 7 }} >
              { rpno && Number(rpno) > 0 ? 
              <>
                <Report_Form 
                  formData={ formData } 
                  formDataChange={ formDataChange } 
                  isReadOnly={ true } 
                  isUpdate={ false } 
                  rpno={ rpno } 
                  approval={ approval } 
                />
              
                <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                  <Button variant="contained" color="info" sx={{ mt: 3, ml: 3 }} onClick={ () => onUpdate() } >
                      수정
                  </Button>
                  <Button variant="contained" color="info" sx={{ mt: 3, ml: 3 }} onClick={ () => onDelete() } >
                      삭제
                  </Button>
                </div>
              </> : 
              null }
            </Item>
          </Grid>
          
        </Grid>
      </Box>
    );
}
