import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/* mui import */
import Table from '@mui/joy/Table';

export default function Report_Approval_List( { rpno, reports, page, setReports, setPage, setTotalPages, selectValue } ) {
  if( rpno == null ){ rpno = '' };

  useEffect( () => { onFindByMno( page, selectValue ); }, [ page, selectValue ] );

  const onFindByMno = async ( page, selectValue ) => {
    try{
      // select로 선택된 apstate 상태 부여
      let apstateSQL = null;
      if( selectValue != 2 ){ apstateSQL = `apstate=${selectValue}&`; }  
      const response = await axios.get( `http://localhost:8080/api/approval/list?${apstateSQL}page=${page}&pageSize=10`, { withCredentials : true } )
      setReports( response.data.list );
      setPage( response.data.pageNum );
      setTotalPages( response.data.pages );
    }catch( e ){ console.log(e); }
  } // f end

  const navigate = useNavigate();
  const onView = async ( rpno ) => { await navigate( `/report/approval/${rpno}` ); }

  return (<>
    <div style={{ height: '640px' }} >
      <Table 
        hoverRow 
        // variant='outlined'
        sx={{ 
          '& th' : { textAlign: 'center', backgroundColor: '#e5edf7' }, 
          '& td' : { height: '60px' }
        }} 
      >
        <thead>
          <tr>
            <th style={{ width: '10%' }}> 번호 </th>
            <th style={{ width: '40%' }}> 보고서명 </th>
            <th style={{ width: '25%' }}> 보고자명 </th>
            <th style={{ width: '25%' }}> 날짜 </th>
          </tr>
        </thead>
        <tbody>
          {
          reports.length > 0 ?
            reports.map( ( row )  => (
              <tr key = { row.rpno } onClick={ () => onView( row.rpno ) } 
                style={{ backgroundColor: rpno == row.rpno ? '#eeeeee'  : '' }}>
                <td> { row.rpno } </td>
                <td style={{ textAlign: 'left' }} > 
                  { row.rpname } { selectValue == 2 && row.apstate ? "(완료)" : "" }
                </td>
                <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }} > 
                  { row.mname } <div> ( { row.mdepartment } ) </div>  
                </td>
                <td> { row.rpdate } </td>
              </tr>
            )) :
              <tr>
                <td colSpan={4} > 결재 대기중인 보고서가 없습니다. </td>
              </tr>
          }
        </tbody>
      </Table>
    </div>
  </>);
}