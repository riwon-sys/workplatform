import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/* mui import */
import Table from '@mui/joy/Table';

export default function Report_List( 
  { rpno, reports, page, setReports, setPage, setTotalPages, refresh, setRefresh } ) {
  
  if( rpno == null ){ rpno = '' };

  useEffect( () => { onFindByMno( page ); }, [ page, refresh ] );

  const onFindByMno = async ( page ) => {
    try{
      const response = await axios.get( `http://localhost:8080/api/report?page=${page}&pageSize=10`, { withCredentials : true } )
      if( response.data.list != null ){ setReports( response.data.list ); }
      else{ 
        setReports( [] ); 
        navigate('/');
      }
      setPage( response.data.pageNum );
      setTotalPages( response.data.pages );
    }catch( e ){ console.log(e); }
    finally {
      setRefresh( false ); // 데이터 갱신 후 refresh 상태 초기화
    }
  } // f end

  const navigate = useNavigate();
  const onView = async ( rpno ) => { await navigate( `/report/view/${rpno}` ); }

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
                <td style={{ textAlign: 'left' }} > { row.rpname } </td>
                <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }} > 
                  { row.mname } <div> ( { row.mdepartment } ) </div>  
                </td>
                <td> { row.rpdate } </td>
              </tr>
            )) :
              <tr>
                <td colSpan={4} > 작성한 보고서가 없습니다. </td>
              </tr>
          }
        </tbody>
      </Table>
    </div>
  </>);
}