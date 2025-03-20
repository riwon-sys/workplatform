import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Report_Form from './Report_Form';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(7),
  textAlign: 'center',
  height: '100%',
}));

export default function Report_Write(){

  const [ formData, setFormData ] = useState({
    rpname: '일일 업무 보고서' ,
    rpam: '',
    rppm: '',
    rpamnote: '',
    rppmnote: '',
    rpunprocessed: '',
    rpsignificant: '', 
    rpexpected: '' 
  });
  const [ mrank, setMrank ] = useState('');
  const [ approval, setApproval ] = useState([
    { rank: "대리", mno: "", rpno: "" },
    { rank: "차장", mno: "", rpno: "" },
    { rank: "과장", mno: "", rpno: "" },
    { rank: "부장", mno: "", rpno: "" },
  ]);
  const [ members, setMembers ] = useState([]);
  const [ reports, setReports ] = useState( [] );
  const [ membersByRank, setMembersByRank ] = useState({}); // 직급별 멤버 상태
  console.log( approval );

  const formDataChange = (e) => {
      setFormData( { ...formData, [ e.target.name ] : e.target.value } )
  } // f end

  // 보고서 등록 함수
  const onPost = async ( props ) => {
    try{
      const response = await axios.post( 'http://localhost:8080/api/report', formData );
      if( response.data ){
        onApprovalPost();
      }else{ alert('등록 실패') }
    }catch( e ){ console.log( e ); }
  } // f end 

  // 보고서 결재 등록
  const onApprovalPost = async ( props ) => {
    try{
      console.log( approval );
      const response = await axios.post( 'http://localhost:8080/api/approval', approval );
      if( response.data ){
        alert('등록 성공');
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

  const handleApprovalChange = (rank) => async (e) => {
    const selectedMno = e.target?.value; // 안전한 접근을 위해 optional chaining 사용
    
    if (!selectedMno) {
      console.error("선택된 멤버가 없습니다.");
      return;
    }
    
    const updatedApproval = approval.map((item) =>
      item.rank === rank ? { ...item, mno: selectedMno } : item
    );
  
    setApproval(updatedApproval);
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
                <Button variant="contained" color="info" sx={{ mt: 3 }} onClick={ onPost } >
                    등록
                </Button>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
      
  </>)
}
    
