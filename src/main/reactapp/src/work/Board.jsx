import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: '100%',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

export default function Report_Write(){
    return(<>
        <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#eeeeee' }}>
          <Grid container spacing={0} sx={{ height: '100%' }}> 
            {/* size: 너비 조정 */}
            <Grid size={7} sx={{ height: '100%', margin: '0 auto'  }}>
              <Item>size=7</Item>
            </Grid>
          </Grid>
        </Box>
            
    </>)
}
    
