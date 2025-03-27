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

export default function PostModal( { signCanvas, onPost, approval, onApproval, formData, btnName } ) {
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // 직급 순위 매핑
  const rankOrder = {
    대리: 1,
    과장: 2,
    차장: 3,
    부장: 4,
  };

  // 유효성검사 : 모달 열기 전에 승인자 선택 여부 확인
  const handleOpen = () => {
    // 현재 로그인한 사용자의 직급 순위 가져오기
    const userRankOrder = rankOrder[ formData.mrank ] || 0; 

    // 로그인한 사용자의 직급보다 높은 직급만 검사
    const unselectedRanks = approval
      .filter( ( item ) => !item.mno && rankOrder[ item.rank ] > userRankOrder )
      .map( ( item ) => item.rank );

    if ( unselectedRanks.length > 0 ) {
      alert(`결재자가 선택되지 않았습니다: ${ unselectedRanks.join(", ") }`);
      return; // 모달 열지 않음
    }

    // 유효성검사 : 오전 업무 보고 작성 여부
    if( formData.rpam == '' ){ 
      alert('오전 업무 보고 내용을 작성해주세요.');
      return; 
    }

    // 유효성검사 : 오후 업무 보고 작성 여부
    if( formData.rppm == '' ){ 
      alert('오후 업무 보고 내용을 작성해주세요.');
      return; 
    }

    setOpen(true);
  };

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
            { btnName }
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
              {
                btnName == "작성" ?
                  <Button variant="contained" color="info" sx={{ mt: 2 }} onClick={ onPost } >
                    등록
                  </Button> :
                  <Button variant="contained" color="info" sx={{ mt: 2 }} onClick={ onApproval } >
                    결재
                  </Button>
              }
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
