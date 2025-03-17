import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Report_List from './Report_List';
import Button from '@mui/material/Button';

import Report_Form from './Report_Form';
import * as React from 'react';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    height: '100%', // 높이 설정 추가
}));

export default function Report_Update() {

  const { rpno } = useParams();

  useEffect(() => { 
    if ( rpno ) { onFindByRpno(); } 
  }, [ rpno ]);

  const [ formData, setFormData ] = useState({
      rpname: '일일 업무 보고서' ,
      rpam: '',
      rppm: '',
      rpamnote: '',
      rppmnote: '',
      rpunprocessed: '',
      rpsignificant: '', 
      rpexpected: '',
      mname: '',
      mrank: '',
      mdepartment: '' 
    });

  const formDataChange = (e) => {
    setFormData( { ...formData, [ e.target.name ] : e.target.value } )
  } // f end
  
  useEffect( () => { onFindByRpno(); }, [] )

  const onFindByRpno = async ( props ) => {
    if( !rpno ){ return; }
    try{
      const response = await axios.get( `http://localhost:8080/report/view?rpno=${rpno}` );
      setFormData( response.data );
      console.log( response.data.mrank )
    }catch( e ){ console.log( e ) }
  } // f end

  return (
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={0} sx={{ height: '100%' }}> 
          {/* size: 너비 조정 */}
          <Grid size={5} sx={{ height: '100%' }}> 
            <Item>
              <h1> 보고서 목록 </h1>
              <br/>
              <React.StrictMode>
                <StyledEngineProvider injectFirst>
                  <CssVarsProvider>
                    <Report_List rpno = { rpno } />
                  </CssVarsProvider>
                </StyledEngineProvider>
              </React.StrictMode>
            </Item>
          </Grid>
          
          <Grid size={7} sx={{ height: '100%', margin: '0 auto' }}>
            <Item sx={{ overflow: 'scroll', overflowX: 'hidden', minWidth: '700px', padding: 5 }} >
              { rpno && Number(rpno) > 0 ? 
              <>
                <Report_Form formData={ formData } formDataChange={ formDataChange } 
                  isReadOnly={ true } rpno={ rpno } />
 
                <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                  <Button variant="contained" color="info" sx={{ mt: 3, ml: 3 }} >
                      수정
                  </Button>
                  <Button variant="contained" color="info" sx={{ mt: 3, ml: 3 }} >
                      삭제
                  </Button>
                </div>
              </> : 
              null }
            </Item>
          </Grid>
          
        </Grid>
      </Box>
    );
}
