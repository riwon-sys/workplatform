import Table from '@mui/joy/Table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Report_List() {

  const [ reports, setReports ] = useState( [] );
  const navigate = useNavigate();
  
  // 로그인 세션 대용 mno
  const mno = 100004;
  
  useEffect( () => { onFindByMno() }, [] );

  const onFindByMno = async ( props ) => {
    const response = await axios.get( `http://localhost:8080/report` )
    setReports( [ ...reports, response.data ] );
  } // f end

  const onView = ( rpno ) => {
    navigate( `/report/view/rpno` );
  } // f end

  return (
    <Table hoverRow sx={{ '& tr > *:not(:first-of-type)': { textAlign: 'center' } }} >
      <thead>
        <tr>
          <th style={{ width: '10%' }}> 번호 </th>
          <th style={{ width: '50%' }}> 보고서명 </th>
          <th style={{ width: '20%' }}> 보고자명 </th>
          <th style={{ width: '20%' }}> 날짜 </th>
        </tr>
      </thead>
      <tbody>
        {
        reports != [] ?
          reports.map( ( row )  => (
            <tr key = { row.rpno } onClick={ () => onView( row.rpno ) } >
              <td> { row.rpno } </td>
              <td style={{ textAlign: 'left' }} >{ row.rpname }</td>
              <td> { row.rpdate } </td>
              <td> { row.mname } </td>
            </tr>
          )) :
            <tr>
              <td colSpan={4} > 작성한 보고서가 없습니다. </td>
            </tr>
        }
      </tbody>
    </Table>
  );
}