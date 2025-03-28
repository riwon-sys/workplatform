import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

/* mui import */
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { CssVarsProvider } from '@mui/joy/styles';

/* jsx import */
import Report_Approval_List from './component/report/Report_Approval_List';
import Report_Form from './component/report/Report_Form';
import SelectSmall from './component/report/SeleclSmall';
import PostModal from './component/report/PostModal';
import LoadingIconButton from './component/report/LoadingIconButton';
import { useSelector } from 'react-redux';
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

export default function Report_Approval({ setNextApMno, setNextAp, setNextApState, nextApState }) {
  const loginInfo = useSelector((state) => state.user.userInfo);

  // Signature Canvas 참조
  const signCanvas = useRef( null );

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
    mrank: loginInfo.mrank,
    mdepartment: '',
    apno: ''
  });
  const [ reports, setReports ] = useState( [] );
  const [ page, setPage ] = useState(1); // 현재 페이지
  const [ totalPages, setTotalPages ] = useState(1); // 전체 페이지 수
  const [ approval, setApproval ] = useState( [] );
  const [ selectValue , setSelectValue ] = useState( 0 );
  const navigate = useNavigate();
  
  // select
  const selectValueChange = ( e ) => {
    setSelectValue( e.target.value );
  };

  // formData
  const formDataChange = (e) => {
    setFormData( { ...formData, [ e.target.name ] : e.target.value } );
  } // f end

  // 보고서 상세 조회 함수
  useEffect(() => { 
    if ( rpno ) { onFindByRpno(); } 
  }, [ rpno, nextApState ]);

  const onFindByRpno = async ( props ) => {
    if( !rpno ){ return; }
    try{
      const response = await axios.get( `http://localhost:8080/api/report/view?rpno=${rpno}` );
      setFormData( response.data );
      setNextAp( response.data ) // 소켓으로 보낼 보고서 정보
    }catch( e ){ console.log( e ); }
  } // f end

     // 소켓으로 보낼 nextApState가 변경될 때마다 실행되는 useEffect
     useEffect(() => {
      if (nextApState) {
        console.log('nextApState 값이 변경되어 true로 설정되었습니다.');
        //onFindByRpno();
      }
    }, [nextApState]);  

  // 보고서 결재
  const onApproval = async ( props ) => {
    if( signCanvas.current.isEmpty() ){ alert('서명 후 등록이 가능합니다.'); return; }

    if( !confirm('보고서 결재를 완료하시겠습니까?') ){ return; }
    try{
      const report = reports.filter( ( report ) => report.rpno == rpno );
      const apno = report[0].apno;

      const updateApproval = approval.filter( ( approve ) => 
        approve.apsignature == null && ( approve.apno <= apno+1 ) );
      console.log( updateApproval );

      // signData는 Base64로 인코딩된 서명 이미지 데이터
      const signData = signCanvas.current.toDataURL();

      // dataURL을 file로 변환
      const convertDataUrlToFile = (dataURL, filename) => {
        const arr = dataURL.split(",");
        const mimeType = arr[0].match(/:(.*?);/)[1];
        const byteString = atob(arr[1]);
        const byteArray = new Uint8Array(byteString.length);
      
        for (let i = 0; i < byteString.length; i++) {
          byteArray[i] = byteString.charCodeAt(i);
        }
      
        return new File([byteArray], filename, { type: mimeType });
      };

      // file name 설정
      const file = convertDataUrlToFile( signData, 'signature.png' );

      // FormData 객체 생성
      const signFormData = new FormData();
      signFormData.append( 'uploadFile', file );
      signFormData.append( 'jsonaplist', JSON.stringify(updateApproval) );

      const response = await axios.put( `http://localhost:8080/api/approval`, signFormData, { withCredentials : true } )
      if( response ){
        alert('보고서 결재를 완료하였습니다.');
        navigate("/report/approval")
        
        // 소켓으로 보낼 상태 변수
        setNextApState(true)
        console.log(nextApState)
        console.log(nextApState)
      }else{ alert('보고서 결제 실패') }
    }catch( e ){ console.log( e ); alert('보고서 결제 실패'); }

  } // f end

  
  // mui 페이지네이션 페이지 번호 가져오기
  const handlePageChange = ( value ) => {
    setPage( value );
  }

  // rpno 바뀔때마다 결재자 찾기
  useEffect( () => { onApprovalByRpno( rpno ); }, [ rpno ] );

  // 보고서 결재자 찾기
  const onApprovalByRpno = async ( rpno ) => {
    try{
      const response = await axios.get( `http://localhost:8080/api/approval?rpno=${rpno}`, { withCredentials : true } );
      setApproval( response.data );
      console.log("결재자" , response.data)
      setNextApMno(response.data) // 소켓으로 보낼 다음 결재자 mno
    }catch( e ){ console.log( e ); } 
  } // f end

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
            <h1> 보고서 결재 목록 </h1>

            <SelectSmall 
              select={ selectValue }
              handleChange={ selectValueChange }
            />
            
            <CssVarsProvider>
              <Report_Approval_List
                rpno={ rpno }
                reports={ reports }
                page={ page }
                setReports={ setReports }
                setPage={ setPage }
                setTotalPages={ setTotalPages }
                selectValue={ selectValue }
                nextApState={ nextApState }
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
            minWidth: '700px', // xs(작은 화면)에서는 100% 사용
            maxWidth: '100%', // 최대 100% 사용
            width: '100%',
            height: '100%'
          }}
        >
          <Item
            sx={{
              overflow: 'scroll',
              overflowX: 'hidden',
              padding: 10,
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
                  isUpdate={ false }
                  rpno={ rpno }
                  approval={ approval }
                />
    
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {
                    selectValue == 1 ? null
                    :
                    <PostModal 
                      signCanvas={ signCanvas } 
                      btnName={ "결재" } 
                      approval={ approval }
                      onApproval={ onApproval } 
                      formData={ formData }
                    />
                  }
                </div>
              </>
            ) : null}
          </Item>
        </Grid>
      </Grid>
    </Box>
  
    );
}
