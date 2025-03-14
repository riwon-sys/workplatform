import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import BasicSelect from './BasicSelect';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  height: '100%',
}));

const [age, setAge] = React.useState('');

const handleChange = (event) => {
  setAge(event.target.value);
};

export default function Report_Write(){
    return(<>
        <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#eeeeee' }}>
          <Grid container spacing={0} sx={{ height: '100%' }}> 
            <Grid size={7} sx={{ height: '100%', margin: '0 auto' }}>
              <Item sx={{ overflow: 'scroll', overflowX: 'hidden'  }} >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }} >
                  <h1 style={{ margin: '0 auto' }} > 일일 업무 보고서 </h1>
                  
                  <form>
                    <table border={2} style={{ borderCollapse: 'collapse' }} >
                      <thead>
                        <tr>
                          <th style={{ width: '100px' }} > 대리 </th>
                          <th style={{ width: '100px' }} > 과장 </th>
                          <th style={{ width: '100px' }} > 차장 </th>
                          <th style={{ width: '100px' }} > 부장 </th>
                        </tr>
                      </thead>

                      <tbody >
                        <tr>
                          <td>
                            
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
                          <td style={{ width: '30%' }} > 2025년 3월 14일 (금 요일) </td>
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
                            <textarea style={{ width: '95%', height: '90%', border: 'none', resize: 'none' }} />
                          </td>  
                          <td style={{ width: '20%' }} > 
                            <textarea style={{ width: '95%', height: '90%', border: 'none', resize: 'none' }} /> 
                          </td>    
                        </tr>

                        <tr>
                          <th style={{ width: '5%', backgroundColor: '#eeeeee' }} > 오후 </th> 
                          <td style={{ width: '60%' }} > 
                            <textarea style={{ width: '95%', height: '90%', border: 'none', resize: 'none' }} />
                          </td>  
                          <td style={{ width: '20%' }} > 
                            <textarea style={{ width: '95%', height: '90%', border: 'none', resize: 'none' }} /> 
                          </td>  
                        </tr>

                        <tr style={{ height: '15%' }} >
                          <th style={{ width: '15%', backgroundColor: '#eeeeee' }} > 미실시 내역 </th>
                          <td colSpan={3} >
                            <textarea style={{ width: '95%', height: '80%', border: 'none', resize: 'none' }} />
                          </td>  
                        </tr>

                        <tr style={{ height: '15%' }} >
                          <th style={{ width: '15%', backgroundColor: '#eeeeee' }} > 특이 사항 </th>
                          <td colSpan={3} >
                            <textarea style={{ width: '95%', height: '80%', border: 'none', resize: 'none' }} />
                          </td>  
                        </tr>

                        <tr style={{ height: '15%' }} >
                          <th style={{ width: '15%', backgroundColor: '#eeeeee' }} > 예정 사항 </th>
                          <td colSpan={3} >
                           <textarea style={{ width: '95%', height: '80%', border: 'none', resize: 'none',}} />
                          </td>  
                        </tr>
                      </thead>
                    </table>
                    
                  </form>
                  <div style={{  }} >
                    <Button variant="contained" color="info" sx={{ mt: 3 }} >
                      <Link style={{ color: 'white' }} > 등록 </Link>
                    </Button>
                  </div>
                  
              </Item>
            </Grid>
          </Grid>
        </Box>
        
    </>)
}
    
