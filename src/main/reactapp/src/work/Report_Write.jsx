import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Report_Form from './Report_Form';
import { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
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

  const formDataChange = (e) => {
      setFormData( { ...formData, [ e.target.name ] : e.target.value } )
  } // f end

  const onPost = async ( props ) => {
    try{
      console.log( formData );
      const response = await axios.post( 'http://localhost:8080/report', formData );
      if( response.data == true ){
        alert('등록 성공');
        setFormData( { rpname: '일일 업무 보고서', rpam: '', rppm: '', rpamnote: '', rppmnote: '',
          rpunprocessed: '', rpsignificant: '', rpexpected: '' } );
      }else{ alert('등록 실패') }
    }catch( e ){ console.log( e ) }
  } // f end 

  return(<>
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#eeeeee' }}>
        <Grid container spacing={0} sx={{ height: '100%' }}> 
          <Grid size={7} sx={{ height: '100%', margin: '0 auto' }}>
            <Item sx={{ overflow: 'scroll', overflowX: 'hidden', minWidth: '700px' }} >
              <Report_Form formData={ formData } formDataChange={ formDataChange } 
                isReadOnly={ false } />

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
    
