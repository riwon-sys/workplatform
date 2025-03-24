/* mui import */
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

/* jsx import */
import Report_Form from './Report_Form';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  paddingTop: '30px',
  textAlign: 'center',
  color: theme.palette.text.primary,
  height: '100%', // 높이 설정 추가
}));

export default function PDF_Viewer( { formData, rpno, approval } ){
  return(<>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="contained" color="info" sx={{ mb: 3, ml: 3 }} >
        이전
      </Button>
      {/* <Button variant="contained" color="info" sx={{ mb: 3, ml: 3 }} >
        PDF 저장
      </Button> */}
    </div>
    <Item
      sx={{
        overflow: 'scroll',
        overflowX: 'hidden',
        padding: 10,
        width: '100%', // 기본적으로 100% 차지
        minHeight: { sm: '1350px', lg: '100%' }
      }}
    >
      {rpno && Number(rpno) > 0 ? (
        <>
          <Report_Form
            formData={ formData }
            isReadOnly={ true }
            isUpdate={ false }
            rpno={ rpno }
            approval={ approval }
          />
        </>
      ) : null}
    </Item>
  </>);
}