import Button from '@mui/material/Button';
import BasicSelect from './BasicSelect';

export default function Report_Form(){
  const [ formData, setFormData ] = useState( { rpname: '일일 보고서' , rpam: '', rppm: '', 
    rpamnote: '' , rppmnote: '', rpunprocessed: '', rpsignificant: '', 
    rpexpected: '' } );
  const formDataChange = (e) => {
    console.log( e.target.value );
    setFormData( { ...formData, [ e.target.name ] : e.target.value } )
  } // f end

  const onPost = async ( props ) => {
    try{
      console.log( formData );
      const response = await axios.post( 'http://localhost:8080/report', formData );
      if( response.data == true ){
        alert('등록 성공');
        setFormData( { rpname: '일일 보고서', rpam: '', rppm: '', rpamnote: '', rppmnote: '',
          rpunprocessed: '', rpsignificant: '', rpexpected: '' } );
      }else{ alert('등록 실패') }
    }catch( e ){ console.log( e ) }
  } // f end 

  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  const WEEKDAY = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  let week = WEEKDAY[today.getDay()];
  let day = year+''+month+''+date;

  return(<>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }} >
      <h1 style={{ margin: '0 auto' }} > 일일 업무 보고서 </h1>
      
      <form>
        <table border={2} style={{ borderCollapse: 'collapse' }} >
          <tbody >
            <tr>
              <td width='100px' >  
                <BasicSelect rank={ "대리" } />
              </td>
              <td width='100px'>
                <BasicSelect rank={ "차장" } />
              </td>
              <td width='100px'>
                <BasicSelect rank={ "과장" } />
              </td>
              <td width='100px'>
                <BasicSelect rank={ "부장" } />
              </td>
            </tr>
            <tr style={{ height: '80px' }} >
              <td> <img /> </td>
              <td> <img /> </td>
              <td> <img /> </td>
              <td> <img /> </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>

    <form>
      <table border={2} style={{ borderCollapse: 'collapse', width: '100%', height: '70px', marginBottom: '30px' }} >
        <tbody>
          <tr>
            <th style={{ width: '20%', backgroundColor: '#eeeeee' }} > 작성일자 </th>
            <td style={{ width: '30%' }} > {year}년 {month}월 {date}일 ({week}) </td>
            <th style={{ width: '20%', backgroundColor: '#eeeeee' }} > 작성자 </th>
            <td style={{ width: '30%' }} > 최진우 </td>
          </tr>

          <tr>
            <th style={{ width: '20%', backgroundColor: '#eeeeee' }} > 소속 </th>
            <td style={{ width: '30%' }} > 인사 </td>
            <th style={{ width: '20%', backgroundColor: '#eeeeee' }} > 직위 </th>
            <td style={{ width: '30%' }} > 사원 </td>
          </tr>
        </tbody>
      </table>

      <table border={2} style={{ borderCollapse: 'collapse', width: '100%', height: '850px' }}>
        <thead>
          <tr>
            <th style={{ width: '15%', backgroundColor: '#eeeeee' }} rowSpan={3} > 금일<br/>실시사항 </th>
            <th style={{ width: '65%', height: '5%', backgroundColor: '#eeeeee' }} colSpan={2} > 금일 업무보고 </th>
            <th style={{ width: '20%', backgroundColor: '#eeeeee' }} > 비 고 </th>   
          </tr>

          <tr>
            <th style={{ width: '5%', backgroundColor: '#eeeeee' }} > 오전 </th>   
            <td style={{ width: '60%' }} > 
              <textarea style={{ width: '95%', height: '90%', border: 'none', resize: 'none' }} 
                type="text" name="rpam" value={ formData.rpam } onChange={ formDataChange } />
            </td>  
            <td style={{ width: '20%' }} > 
              <textarea style={{ width: '95%', height: '90%', border: 'none', resize: 'none' }}
                type="text" name="rpamnote" value={ formData.rpamnote } onChange={ formDataChange } /> 
            </td>    
          </tr>

          <tr>
            <th style={{ width: '5%', backgroundColor: '#eeeeee' }} > 오후 </th> 
            <td style={{ width: '60%' }} > 
              <textarea style={{ width: '95%', height: '90%', border: 'none', resize: 'none' }} 
                type="text" name="rppm" value={ formData.rppm } onChange={ formDataChange } />
            </td>  
            <td style={{ width: '20%' }} > 
              <textarea style={{ width: '95%', height: '90%', border: 'none', resize: 'none' }}
                type="text" name="rppmnote" value={ formData.rppmnote } onChange={ formDataChange } /> 
            </td>
          </tr>

          <tr style={{ height: '15%' }} >
            <th style={{ width: '15%', backgroundColor: '#eeeeee' }} > 미실시 내역 </th>
            <td colSpan={3} >
              <textarea style={{ width: '97%', height: '80%', border: 'none', resize: 'none' }} 
                type="text" name="rpunprocessed" value={ formData.rpunprocessed } onChange={ formDataChange } />
            </td>  
          </tr>

          <tr style={{ height: '15%' }} >
            <th style={{ width: '15%', backgroundColor: '#eeeeee' }} > 특이 사항 </th>
            <td colSpan={3} >
              <textarea style={{ width: '97%', height: '80%', border: 'none', resize: 'none' }}
                type="text" name="rpsignificant" value={ formData.rpsignificant } onChange={ formDataChange } />
            </td>  
          </tr>

          <tr style={{ height: '15%' }} >
            <th style={{ width: '15%', backgroundColor: '#eeeeee' }} > 예정 사항 </th>
            <td colSpan={3} >
              <textarea style={{ width: '97%', height: '85%', border: 'none', resize: 'none' }}
                type="text" name="rpexpected" value={ formData.rpexpected } onChange={ formDataChange } />
            </td>  
          </tr>
        </thead>
      </table>
      
    </form>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
      <Button variant="contained" color="info" sx={{ mt: 3 }} onClick={ onPost } >
        등록
      </Button>
    </div>
  </>);
} // f end
