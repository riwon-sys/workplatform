import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import axios from 'axios';
import Report_Form from './Report_Form';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  height: '100%',
}));


  

export default function Report_Write(){

  return(<>
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#eeeeee' }}>
        <Grid container spacing={0} sx={{ height: '100%' }}> 
          <Grid size={7} sx={{ height: '100%', margin: '0 auto' }}>
            <Item sx={{ overflow: 'scroll', overflowX: 'hidden', minWidth: '700px' }} >
              <Report_Form />
            </Item>
          </Grid>
        </Grid>
      </Box>
      
  </>)
}
    
