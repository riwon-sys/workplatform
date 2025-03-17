import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Report_List from './Report_List';

import Report_Form from './Report_Form';
import * as React from 'react';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import { useParams } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    height: '100%', // 높이 설정 추가
}));

export default function Report_View_Rpno() {

  const rpno = useParams().rpno;

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
              <Report_Form  pagename = { 'view' } rpno = { 'rpno' } /> : 
              null }
            </Item>
          </Grid>
          
        </Grid>
      </Box>
    );
}
