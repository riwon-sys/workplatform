import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

/* mui import */
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { CssVarsProvider } from '@mui/joy/styles';

/* jsx import */
import Report_List from './component/report/Report_List';
import Report_Form from './component/report/Report_Form';
import PDF_Viewer from './component/report/PDF_Viewer';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    paddingTop: '30px',
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
  const [ refresh, setRefresh ] = useState( false );
  const navigate = useNavigate();
  
  const formDataChange = (e) => {
    setFormData( { ...formData, [ e.target.name ] : e.target.value } );
  } // f end

  // 보고서 상세 조회 함수
  useEffect(() => {
    if ( rpno ) {
      onFindByRpno();
    }
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
        alert('보고서 삭제가 완료되었습니다.');
        setRefresh( true );
        navigate( '/report/view' );
      }else{ alert('보고서 삭제 실패'); }
    }catch( e ){ console.log( e ); }
  }

  // mui 페이지네이션 페이지 번호 가져오기
  const handlePageChange = ( e, value ) => {
    setPage( value );
  }

  // rpno 바뀔때마다 결재자 찾기
  useEffect( () => { if( rpno ){ onApprovalByRpno( rpno ); } }, [ rpno ] );

  // 보고서 결재자 찾기
  const onApprovalByRpno = async ( rpno ) => {
    try{
      const response = await axios.get( `http://localhost:8080/api/approval?rpno=${rpno}`, { withCredentials : true } );
      setApproval( response.data );
    }catch( e ){ console.log( e ); } 
  } // f end

  // const downloadPDF = async () => {
  //   const html2pdf = (await import("html2pdf.js")).default;
  //   const element = document.getElementById("pdf-download"); // PDF로 변환할 요소 선택
  //   const options = {
  //     margin: 20,
  //     filename: "my_file.pdf",
  //     image: { type: "jpeg", quality: 1 },
  //     html2canvas: { scale: 3, useCORS: true }, // 해상도 및 CORS 문제 해결
  //     jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  //   };
  
  //   html2pdf().from(element).set(options).save();
  // };

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column' 
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // md 이상에서만 가로 배치
        }}
      >
        {/* 좌측 리스트 */}
        <Grid
          sx={{
            flex: 1.2, // 가능한 범위 내에서만 확장
            minWidth: { xs: '700px', md: '420px' }, // md 이상에서는 최소 420px
            maxWidth: { xs: '700px', md: '100%' }, // 최대 너비 제한
            height: '100vh', // 높이 고정
          }}
        >
          <Item>
            <h1> 나의 보고서 </h1>
            <br />
            <CssVarsProvider>
              <Report_List
                rpno={ rpno }
                reports={ reports }
                page={ page }
                setReports={ setReports }
                setPage={ setPage }
                setTotalPages={ setTotalPages }
                refresh={ refresh }
                setRefresh={ setRefresh }
              />
            </CssVarsProvider>
    
            <Stack spacing={2} mt={1}>
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
    
        {/* 우측 폼 */}
        <Grid
          sx={{
            flex: 1.8,
            minWidth: '700px' , // xs(작은 화면)에서는 100% 사용
            maxWidth: '100%', // 최대 100% 사용
            width: '100%',
            height: '100%'
          }}
        >
          <Item
            sx={{
              overflow: 'scroll',
              overflowX: 'hidden',
              paddingX: 10,
              width: '100%', // 기본적으로 100% 차지
              minHeight: { sm: '1350px', lg: '100%' }
            }}
          >
            {rpno && Number(rpno) > 0 ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <CssVarsProvider>
                    <PDF_Viewer 
                      formData={ formData }
                      formDataChange={ formDataChange }
                      rpno={ rpno }
                      approval={ approval }
                    />
                  </CssVarsProvider>
                </div>
                <Report_Form
                  id='pdf-download'
                  formData={ formData }
                  formDataChange={ formDataChange }
                  isReadOnly={ true }
                  isUpdate={ true }
                  rpno={ rpno }
                  approval={ approval }
                />
    
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" color="info" sx={{ my: 3, ml: 2 }} onClick={() => onUpdate()}>
                    수정
                  </Button>
                  <Button variant="contained" color="info" sx={{ my: 3, ml: 2 }} onClick={() => onDelete()}>
                    삭제
                  </Button>
                </div>
              </>
            ) : null}
          </Item>
        </Grid>
      </Grid>
    </Box>
  
    );
}
