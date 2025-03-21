import BasicSelect from './BasicSelect';
import CustomTextarea from './CustomTextarea';

export default function Report_Form( 
  { formData, formDataChange, isReadOnly, approval, handleApprovalChange, membersByRank, isUpdate } ){

  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  const WEEKDAY = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  let week = WEEKDAY[today.getDay()];
  let day = year+''+month+''+date;

  return(<>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'   }} >
      <div style={{ margin: '0 auto', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }} >
        <h1 style={{ marginRight: 10 }} > 일일 업무 </h1>
        <h1> 보고서 </h1>
      </div>
      
      <form>
        <table border={2} style={{ borderCollapse: 'collapse' }} >
          <tbody >
            <tr>
              {
                !isReadOnly && !isUpdate ?
                ["대리", "과장", "차장", "부장"].map((rank) => {
                  const selectedMno = approval.find((item) => item.rank === rank)?.mno || "";

                  return (
                    <td key={ rank } width="100px">
                      <BasicSelect
                        rank={ rank }
                        members={ membersByRank[rank] || [] }
                        value={ selectedMno } // undefined 방지
                        handleChange={ handleApprovalChange(rank) }
                      />
                    </td>
                  );
                }) :
                approval.map( (rank) => {
                  return(
                    <th key={ rank.mname } width="100px">
                      { rank.mname }( { rank.mrank } )
                    </th>
                  )
                })
              }
            </tr>
            <tr style={{ height: '80px' }}>
              {
                !isReadOnly || !isUpdate ?
                approval.map((rank, index) => (
                  <td key={ `${rank.mno || 'empty'}-${index}` } >
                    {
                      rank.apsignature ? 
                      <img 
                      src={`http://localhost:8080/file/${rank.apsignature}.jpg`}
                      style={{ width: '95%', padding: 5 }} 
                      alt="서명 이미지" /> : null
                    }
                  </td>
                )) :
                Array(4).fill(null).map((_, index) => <td key={index}></td>) // 4개의 빈 <td> 자동 생성
              }
            </tr>
          </tbody>
        </table>
      </form>
    </div>

    <form>
      <table border={2} style={{ borderCollapse: 'collapse', width: '100%', height: '70px', marginBottom: '30px', fontSize: '15px' }} >
        <tbody>
          <tr>
            <th style={{ width: '20%', backgroundColor: '#eeeeee' }} > 작성일자 </th>
            <td style={{ width: '30%' }} > {year}년 {month}월 {date}일 ({week}) </td>
            <th style={{ width: '20%', backgroundColor: '#eeeeee' }} > 작성자 </th>
            <td style={{ width: '30%' }} > { formData.mname } </td>
          </tr>

          <tr>
            <th style={{ width: '20%', backgroundColor: '#eeeeee' }} > 소속 </th>
            <td style={{ width: '30%' }} > { formData.mdepartment } </td>
            <th style={{ width: '20%', backgroundColor: '#eeeeee' }} > 직위 </th>
            <td style={{ width: '30%' }} > { formData.mrank } </td>
          </tr>
        </tbody>
      </table>

      <table border={2} style={{ borderCollapse: 'collapse', width: '100%', height: '850px', fontSize: '15px' }}>
        <tbody>
          <tr>
            <th style={{ width: '15%', backgroundColor: '#eeeeee' }} rowSpan={3} > 금일<br/>실시사항 </th>
            <th style={{ width: '65%', height: '5%', backgroundColor: '#eeeeee' }} colSpan={2} > 금일 업무보고 </th>
            <th style={{ width: '20%', backgroundColor: '#eeeeee' }} > 비 고 </th>   
          </tr>

          <tr>
            <th style={{ width: '5%', backgroundColor: '#eeeeee' }} > 오전 </th>   
            <td style={{ width: '60%' }} > 
              <CustomTextarea name="rpam" value={formData.rpam} 
                onChange={formDataChange} isReadOnly={isReadOnly} />
            </td>  
            <td style={{ width: '20%' }} > 
              <CustomTextarea name="rpamnote" value={formData.rpamnote} 
                onChange={formDataChange} isReadOnly={isReadOnly} />
            </td>    
          </tr>

          <tr>
            <th style={{ width: '5%', backgroundColor: '#eeeeee' }} > 오후 </th> 
            <td style={{ width: '60%' }} > 
              <CustomTextarea name="rppm" value={formData.rppm} 
                onChange={formDataChange} isReadOnly={isReadOnly} />
            </td>  
            <td style={{ width: '20%' }} > 
              <CustomTextarea name="rppmnote" value={formData.rppmnote} 
                onChange={formDataChange} isReadOnly={isReadOnly} />
            </td>
          </tr>

          <tr style={{ height: '15%' }} >
            <th style={{ width: '15%', backgroundColor: '#eeeeee' }} > 미실시 내역 </th>
            <td colSpan={3} >
              <CustomTextarea name="rpunprocessed" value={formData.rpunprocessed} 
                onChange={formDataChange} isReadOnly={isReadOnly} />
            </td>  
          </tr>

          <tr style={{ height: '15%' }} >
            <th style={{ width: '15%', backgroundColor: '#eeeeee' }} > 특이 사항 </th>
            <td colSpan={3} >
              <CustomTextarea name="rpsignificant" value={formData.rpsignificant} 
                onChange={formDataChange} isReadOnly={isReadOnly} />
            </td>  
          </tr>

          <tr style={{ height: '15%' }} >
            <th style={{ width: '15%', backgroundColor: '#eeeeee' }} > 예정 사항 </th>
            <td colSpan={3} >
              <CustomTextarea name="rpexpected" value={formData.rpexpected} 
                onChange={formDataChange} isReadOnly={isReadOnly} />
            </td>  
          </tr>
        </tbody>
      </table>
    </form>
  </>);
} // f end
