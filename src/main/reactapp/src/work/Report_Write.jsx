import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Report_Form from './Report_Form';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import PostModal from './PostModal';
import SignatureCanvas from 'react-signature-canvas'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(7),
  textAlign: 'center',
  height: '100%',
}));

export default function Report_Write(){

  // Signature Canvas 참조
  const signCanvas = useRef(null);

  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = (today.getMonth() + 1).toString().padStart(2, '0'); // 월
  let date = today.getDate().toString().padStart(2, '0'); // 일
  let day = year+''+month+''+date;

  const [ formData, setFormData ] = useState({
    rpname: day+' 일일 업무 보고서',
    rpam: '',
    rppm: '',
    rpamnote: '',
    rppmnote: '',
    rpunprocessed: '',
    rpsignificant: '', 
    rpexpected: '' 
  });
  const [ mrank, setMrank ] = useState('');
  const [ lastRpno, setLastRpno ] = useState(''); 
  const [ approval, setApproval ] = useState([
    { rank: "대리", mno: "", rpno: "" },
    { rank: "과장", mno: "", rpno: "" },
    { rank: "차장", mno: "", rpno: "" },
    { rank: "부장", mno: "", rpno: "" }
  ]);
  const [ members, setMembers ] = useState([]);
  const [ reports, setReports ] = useState( [] );
  const [ membersByRank, setMembersByRank ] = useState({}); // 직급별 멤버 상태
  console.log( approval );

  const formDataChange = (e) => {
    setFormData( { ...formData, [ e.target.name ] : e.target.value } )
  } // f end

  // Auto_increment 번호 조회
  const onLastRpno = async () => {
    const response = await axios.get( 'http://localhost:8080/api/report/lastrpno' );
    setLastRpno( response.data );
  } // f end

  useEffect( () => { onLastRpno(); }, [] );

  // 보고서 등록 함수
  const onPost = async ( props ) => {
    if( !confirm('보고서 작성을 완료하시겠습니까?') ){ return; }
    try{
      const response = await axios.post( 'http://localhost:8080/api/report', formData );
      if( response.data ){
        onApprovalPost();
      }else{ alert('등록 실패') }
    }catch( e ){ console.log( e ); }
  } // f end 

  const onApprovalPost = async ( props ) => {
    // signData는 Base64로 인코딩된 서명 이미지 데이터
    const signData = signCanvas.current.toDataURL();
    console.log("signData:", signData);
  
    // Base64 데이터를 Blob으로 변환하는 함수
    const convertBase64ToBlob = (base64Data, mimeType) => {
      const byteCharacters = atob(base64Data.split(',')[1]);
      const byteArrays = [];
  
      for (let offset = 0; offset < byteCharacters.length; offset++) {
        const byte = byteCharacters.charCodeAt(offset);
        byteArrays.push(byte);
      }
  
      return new Blob([new Uint8Array(byteArrays)], { type: mimeType });
    };
  
    // Blob으로 변환
    const blob = convertBase64ToBlob(signData, 'image/png');  // MIME 타입에 맞게 설정
  
    // FormData 객체 생성
    const signFormData = new FormData();
    signFormData.append( 'signature', blob, 'signature.png' );  // 'signature.png'는 파일 이름
    signFormData.append( 'approval', approval );
    try{
      const option = { header: { "Content-Type" : "multipart/form-data" } }
      const response = await axios.post( 'http://localhost:8080/api/approval', signFormData, option );
      if( response.data ){
        alert('등록 성공');
        signCanvas.current.clear();
        setFormData( { rpname: '일일 업무 보고서', rpam: '', rppm: '', rpamnote: '', rppmnote: '',
          rpunprocessed: '', rpsignificant: '', rpexpected: '' } );
      }else{ alert('등록 실패') }
    }catch( e ){ console.log( e ); }
  } // f end

  useEffect(() => {
    const fetchMembers = async () => {
      if (mrank) {
        await onFindByMrank(mrank);
      }
    };
    fetchMembers();
  }, [mrank]);

  // select 선택시 데이터 변경
  const handleApprovalChange = (rank) => async (e) => {
    const selectedMno = e.target?.value; // 안전한 접근
  
    if (!selectedMno) {
      console.error("선택된 멤버가 없습니다.");
      return;
    }
  
  // 기존 approval 배열에서 동일한 rank 항목만 업데이트 (중복 추가 방지)
  setApproval((prevApproval) =>
    prevApproval.map((item) =>
      item.rank === rank ? { ...item, mno: selectedMno, rpno: lastRpno } : item
      )
    );
  };


  // 모든 직급의 멤버를 한 번에 로드
  useEffect(() => {
    const fetchAllMembers = async () => {
      const ranks = ["대리", "차장", "과장", "부장"];
      let newMembersByRank = {};

      for (const rank of ranks) {
        try {
          const response = await axios.get(
            `http://localhost:8080/workplatform/allmembers?mrank=${rank}&mno=${100006}`
          );
          newMembersByRank[rank] = response.data; // 직급별 멤버 저장
        } catch (error) {
          console.error(`${rank} 멤버 조회 실패:`, error);
          newMembersByRank[rank] = []; // 오류 시 빈 배열
        }
      }

      setMembersByRank(newMembersByRank); // 상태 업데이트
    };

    fetchAllMembers();
  }, []); // 처음 마운트될 때만 실행

  return(<>
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#eeeeee' }}>
        <Grid container spacing={0} sx={{ height: '100%' }}> 
          <Grid size={7} sx={{ height: '100%', margin: '0 auto' }}>
            <Item sx={{ overflow: 'scroll', overflowX: 'hidden', minWidth: '700px' }} >
              <Report_Form 
                formData={ formData } 
                formDataChange={ formDataChange } 
                isReadOnly={ false } 
                isUpdate={ false }
                members={ members }
                approval={ approval }
                membersByRank={ membersByRank }
                handleApprovalChange={ handleApprovalChange }
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                {/* <Button variant="contained" color="info" sx={{ mt: 3 }} onClick={ onPost } >
                    등록
                </Button> */}
                <PostModal onPost={ onPost } signCanvas={ signCanvas } />
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
      
  </>)
}
    
