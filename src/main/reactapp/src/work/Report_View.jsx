import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Report_List from './Report_List';
import Report_Write from './Report_Write';

import * as React from 'react';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    height: '100%', // 높이 설정 추가
}));

export default function Report_View() {
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
                      <Report_List />
                    </CssVarsProvider>
                  </StyledEngineProvider>
                </React.StrictMode>
              </Item>
            </Grid>
            <Grid size={7} sx={{ height: '100%' }}>
              <Item>
                <Report_Write />
              </Item>
            </Grid>
          </Grid>
        </Box>
    );
}
