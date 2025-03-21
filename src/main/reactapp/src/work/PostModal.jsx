import * as React from 'react';

/* mui import */
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SignatureCanvas from 'react-signature-canvas'

/* mui icon */
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PostModal( { onPost, signCanvas } ) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 서명 전체 지우기
  const onClear = () => {
    if( !confirm('서명을 지우시겠습니까?') ){ return; }
    signCanvas.current.clear();
  } // f end

  return (
    <div>
      <Button 
        variant="contained" 
        color="info" sx={{ mt: 3 }} 
        onClick={handleOpen}>
            작성
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 400,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                보고서 서명해주세요.
              </Typography>
              <IconButton color="primary" aria-label="add to shopping cart">
                <CloseIcon onClick={ handleClose } />
              </IconButton>
            </Box>

            <Box 
              sx={{ 
                width: '100%', 
                border: '1px solid #e0e0e0',
                margin: '0 auto',
                width: 210, 
                padding: 1,
              }}>
              <SignatureCanvas
                ref={ signCanvas }
                canvasProps={{ 
                  className: 'signCanvas',
                  width: 190,
                }}
              />
            </Box>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
              <Button variant="contained" color="info" sx={{ mt: 2 }} onClick={ onPost } >
                등록
              </Button>
              <Button variant="contained" color="info" sx={{ mt: 2, ml: 3 }} onClick={ onClear } >
                전체 지우기
              </Button>
            </div>
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
