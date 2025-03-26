import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* mui import */
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

/* jsx import */
import Report_Form from './component/report/Report_Form';
import PostModal from './component/report/PostModal';

import Socket from './socket.jsx'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: 'center',
  height: '100%',
}));

export default function Report_Write({setReportState, setMnos, setData, reportState}){
  const loginInfo = useSelector((state) => state.user.userInfo);
  console.log( loginInfo )

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
    rpexpected: '',
    mname: loginInfo.mname,
    mdepartment: loginInfo.department,
    mrank: loginInfo.mrank
  });
  const [ mrank, setMrank ] = useState('');
  const [ lastRpno, setLastRpno ] = useState(''); 
  const [ approval, setApproval ] = useState([
    { rank: "대리", mno: null, rpno: "", apstate: false },
    { rank: "과장", mno: null, rpno: "", apstate: false },
    { rank: "차장", mno: null, rpno: "", apstate: false },
    { rank: "부장", mno: null, rpno: "", apstate: false }
  ]);
  const [ members, setMembers ] = useState([]);
  const [ reports, setReports ] = useState( [] );
  const [ membersByRank, setMembersByRank ] = useState({}); // 직급별 멤버 상태
  // 보고서 소켓으로 전달할 state 변수
 
  const navigate = useNavigate();

  const formDataChange = (e) => {
    setFormData( { ...formData, [ e.target.name ] : e.target.value } )
  } // f end

  // Auto_increment 번호 조회
  const onLastRpno = async () => {
    const response = await axios.get( 'http://localhost:8080/api/report/lastrpno' );
    setLastRpno( response.data+1 );
  } // f end

  useEffect( () => { onLastRpno(); }, [ reports ] );

   // 소켓으로 보낼 reportState가 변경될 때마다 실행되는 useEffect
   useEffect(() => {
    if (reportState) {
      console.log('reportState 값이 변경되어 true로 설정되었습니다.');
    }
  }, [reportState]);  // reportState가 변경될 때마다 실행


  // 보고서 등록 함수
  const onPost = async ( props ) => {
    if( signCanvas.current.isEmpty() ){ alert('서명 후 등록이 가능합니다.'); return; }

    if( !confirm('보고서 작성을 완료하시겠습니까?') ){ return; }
    try{
      const response = await axios.post( 'http://localhost:8080/api/report', formData, { withCredentials : true } );
      if( response.data ){
        onApprovalPost();

        

      }else{ alert('등록 실패'); }
    }catch( e ){ console.log( e ); alert('등록 실패'); }
  } // f end 

  const onApprovalPost = async ( props ) => {
    try{
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
      signFormData.append( 'jsonaplist', JSON.stringify(approval) );
    
      const response = await axios.post( 'http://localhost:8080/api/approval', signFormData , { withCredentials : true } );
      if( response.data ){
        alert('등록 성공');
        navigate('/report/view');
        setFormData( { rpname: '일일 업무 보고서', rpam: '', rppm: '', rpamnote: '', rppmnote: '',
          rpunprocessed: '', rpsignificant: '', rpexpected: '' } );


        // props 로 보고서 소켓으로 전달할 state 변수
        setReportState(true);
        console.log(reportState) // 소켓으로 전달할 상태 확인
        setData(formData)
        console.log(formData)
      }else{ alert('등록 실패'); }
    }catch( e ){ console.log( e ); alert('등록 실패'); }
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
  
    // if (!selectedMno) {
    //   console.error("선택된 멤버가 없습니다.");
    //   return;
    // }
  
  // 기존 approval 배열에서 동일한 rank 항목만 업데이트 (중복 추가 방지)
  setApproval((prevApproval) =>
    prevApproval.map((item) =>
      item.rank === rank ? { ...item, mno: selectedMno, rpno: lastRpno } : item
      )
    );
console.log(approval)
    setMnos(approval);
    console.log(selectedMno)

  };
  console.log(approval)

  // 모든 직급의 멤버를 한 번에 로드
  useEffect(() => {
    const fetchAllMembers = async () => {
      const ranks = ["대리", "차장", "과장", "부장"];
      let newMembersByRank = {};

      for (const rank of ranks) {
        try {
          const response = await axios.get(
            `http://localhost:8080/workplatform/allmembers?mrank=${rank}`,
            { withCredentials : true }
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

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <PostModal onPost={ onPost } signCanvas={ signCanvas } btnName={ "작성" } />
        </div>
      </Item>
    </Box>

  </>)
}
    
