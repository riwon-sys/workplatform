import * as React from 'react';

/* mui import */
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';

/* jsx import */
import Report_Form from './Report_Form';
import LoadingIconButton from './LoadingIconButton';

export default function PDF_Viewer( { formData, formDataChange, rpno, approval } ) {
  const [layout, setLayout] = React.useState(undefined);
  const [scroll, setScroll] = React.useState(true);

  return (
    <React.Fragment>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setLayout('fullscreen');
          }}
        >
          모달
        </Button>
      </Stack>
      <Modal
        open={!!layout}
        onClose={() => {
          setLayout(undefined);
        }}
      >
        <ModalDialog layout={layout}>
          <ModalClose />
          

          <div style={{ width: "800px", margin: "0 auto", overflow: "scroll", overflowX: "hidden"  }} >
            <FormControl
              orientation="horizontal"
              sx={{ bgcolor: '', p: 1, borderRadius: 'sm' }}
            >
              <DialogTitle> PDF 미리보기 </DialogTitle>
              <FormLabel> PDF View </FormLabel>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingIconButton />
              </div>
            </FormControl>
            
            <Report_Form
              id='pdf-download'
              formData={ formData }
              formDataChange={ formDataChange }
              isReadOnly={ true }
              isUpdate={ true }
              rpno={ rpno }
              approval={ approval }
            />
          </div>
          
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}