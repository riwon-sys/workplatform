import Table from '@mui/joy/Table';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Report_List( rpno ) {
  
  const [ reports, setReports ] = useState( [] );
  const [ page, setPage ] = useState(1); // 현재 페이지
  const [ totalPages, setTotalPages ] = useState(1); // 전체 페이지 수

  useEffect( () => { onFindByMno(page) }, [page] );

  const onFindByMno = async ( page ) => {
    const response = await axios.get( `http://localhost:8080/api/report?page=${page}&pageSize=10` )
    setReports( response.data.list );
    console.log( response.data );
    setTotalPages( response.data.pages );
  } // f end

  const navigate = useNavigate();
  const onView = async ( rpno ) => { await navigate( `/report/view/${rpno}` ); }

  return (<>
    <Table hoverRow sx={{ '& tr > *:not(:first-of-type)': { textAlign: 'center' } }} >
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
              style={{ backgroundColor: rpno.rpno == row.rpno ? '#eeeeee'  : 'white' }}>
              <td> { row.rpno } </td>
              <td> { row.rpname } </td>
              <td> { row.mname }( { row.mdepartment } ) </td>
              <td> { row.rpdate } </td>
            </tr>
          )) :
            <tr>
              <td colSpan={4} > 작성한 보고서가 없습니다. </td>
            </tr>
        }
      </tbody>
    </Table>
  </>);
}