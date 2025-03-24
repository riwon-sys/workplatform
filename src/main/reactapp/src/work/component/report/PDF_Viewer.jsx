/* mui import */
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

/* jsx import */
import Report_Form from './Report_Form';
import { StyleSheet } from '@react-pdf/renderer';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  paddingTop: '30px',
  textAlign: 'center',
  color: theme.palette.text.primary,
  height: '100%', // 높이 설정 추가
}));

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 14 },
});

export default function PDF_Viewer( { formData, rpno, approval } ){
  return(<>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
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
      </View>
    </Page>
  </Document>
  </>);
}